import { createContext, useCallback, useContext } from 'react';
import {
  CognitoUser,
  CognitoUserPool,
  CognitoUserAttribute,
  AuthenticationDetails,
} from 'amazon-cognito-identity-js';
import { COGNITO_API } from '../config';
import { CognitoIdentityProviderClient, SignUpCommand } from '@aws-sdk/client-cognito-identity-provider';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity';
import * as AWS from "@aws-sdk/client-cognito-identity-provider";
//################################

const REGION = 'ap-northeast-2'; // 사용할 리전 명시
var loginclient = new AWS.CognitoIdentityProvider({ region: "REGION" });
var client = new CognitoIdentityProviderClient({
  region: REGION,
  credentials: fromCognitoIdentityPool({
    identityPoolId: COGNITO_API.userPoolId, // 신원 풀 ID
    client: new CognitoIdentityProviderClient({ region: REGION }),
  }),
});
//################################




const userPool = new CognitoUserPool({
  UserPoolId: COGNITO_API.userPoolId || '',
  ClientId: COGNITO_API.clientId || '',
});

const CognitoContext = createContext();

export const useCognito = () => useContext(CognitoContext);
export function CognitoProvider({ children }) {
  const getsessionuser = userPool.getCurrentUser();
  // LOGIN
  const login = useCallback(
    (email, password) =>
      new Promise((resolve, reject) => {
        const userData = new CognitoUser({
          Username: email,
          Pool: userPool,
        });

        const authDetails = new AuthenticationDetails({
          Username: email,
          Password: password,
        });
        console.log(email, password)
        userData.authenticateUser(authDetails, {
          onSuccess: (result) => {
            resolve(result);
          },
          onFailure: (error) => {
            reject(error);
          },
        });
      }),
    []
  );
  const signIn = useCallback ((name,password) => {
    // initiateAuth 함수가 Promise를 반환하도록 호출합니다.
    return loginclient.initiateAuth({
      ClientId: COGNITO_API.clientId,
      AuthFlow: 'ALLOW_USER_SRP_AUTH',
      AuthParameters: {
        USERNAME: name,
        PASSWORD: password
      }
    }).then(function(data) {
      // Promise가 성공적으로 처리될 때의 작업을 수행합니다.
      console.log('Authentication successful:', data);
    }).catch(function(err) {
      // Promise가 실패했을 때의 작업을 수행합니다.
      console.error('Authentication error:', err);
    });
  }, [client]); // useCallback의 의존성 배열을 적절하게 설정해야 합니다.
  




  // ##################
  const signUp = useCallback(
    (name, email, password) => {
      const command = new SignUpCommand({
        ClientId: COGNITO_API.clientId,
        Username: name, // Changed from name to email
        Password: password,
        UserAttributes: [{ Name: "name", Value: name }, { Name: "email", Value: email }],
        ValidationData: [{
          Name: "name", // required
          Value: name,
        },
        ], // Changed the order of attributes
      });

      return client.send(command);
    },
    []
  );
  //######################


  // REGISTER


  const register = useCallback(
    (name, email, password, birthdate, gender, location) =>
      new Promise((resolve, reject) => {
        const newAttributes = [
          new CognitoUserAttribute({
            Name: 'name',
            Value: name,
          }),
          new CognitoUserAttribute({
            Name: 'email',
            Value: email,
          }),
          new CognitoUserAttribute({
            Name: 'gender',
            Value: gender,
          }),
          new CognitoUserAttribute({
            Name: 'birthdate',
            Value: birthdate,
          }),

        ];

        userPool.signUp(name, password, newAttributes, [], async (error, result) => {
          console.log(email)
          if (error) {
            console.log(birthdate)
            reject(error);
            console.error(error);
            return;
          }

          resolve(result.userSub);
        });
      }),
    []
  );

  // Resend verification code
  const confirmcode = useCallback(
    (username, code) =>
      new Promise((resolve, reject) => {
        const userData = {
          Username: username,
          Pool: userPool,
        };

        const cognitoUser = new CognitoUser(userData);
        cognitoUser.confirmRegistration(code, true, async (error, result) => {
          if (error) {
            reject(error);
            console.error(error);
            return;
          }

          resolve(undefined);
        });
      }),
    []
  );



  // ========================================
  // Resend verification code
  const resendCode = useCallback(
    (username) =>
      new Promise((resolve, reject) => {
        const userData = {
          Username: username,
          Pool: userPool,
        };

        const cognitoUser = new CognitoUser(userData);

        cognitoUser.resendConfirmationCode(async (error, result) => {
          if (error) {
            reject(error);
            console.error(error);
            return;
          }

          resolve(undefined);
        });
      }),
    []
  );

  // LOGOUT
  const logout = useCallback(() => {
    const cognitoUser = userPool.getCurrentUser();

    if (cognitoUser) {
      cognitoUser.signOut();
      dispatchEvent({
        type: 'LOGOUT',
      });
    }
  }, []);

  return (
    <CognitoContext.Provider value={{ signUp, login, signIn,  register, confirmcode, resendCode, logout }}>
      {children}
    </CognitoContext.Provider>
  )
}
