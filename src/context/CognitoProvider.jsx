import { createContext, useCallback, useContext, useState } from "react";
import {
  CognitoUser,
  CognitoUserPool,
  CognitoUserAttribute,
  AuthenticationDetails,
} from "amazon-cognito-identity-js";
import { COGNITO_API } from "../config";
import {
  CognitoIdentityProviderClient,
  SignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import * as AWS from "@aws-sdk/client-cognito-identity-provider";
//################################

const REGION = "ap-northeast-2"; // 사용할 리전 명시
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
  UserPoolId: COGNITO_API.userPoolId || "",
  ClientId: COGNITO_API.clientId || "",
});

const CognitoContext = createContext();

export const useCognito = () => useContext(CognitoContext);
export function CognitoProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const getsessionuser = userPool.getCurrentUser();
  // LOGIN
  const login = useCallback((email, password) => {
    const userData = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    return new Promise((resolve, reject) => {
      userData.authenticateUser(authDetails, {
        onSuccess: (result) => {
          setIsLoggedIn(true);
          resolve(result);
        },
        onFailure: (error) => {
          setIsLoggedIn(false);
          reject(error);
        },
      });
    });
  }, []);
  // LOGOUT
  const logout = useCallback(() => {
    const cognitoUser = userPool.getCurrentUser();

    if (cognitoUser) {
      cognitoUser.signOut();
      setIsLoggedIn(false);
    }
  }, []);

  const register = useCallback(
    (name, email, password) =>
      new Promise((resolve, reject) => {
        const newAttributes = [
          new CognitoUserAttribute({
            Name: "email",
            Value: email,
          }),
          new CognitoUserAttribute({
            Name: "name",
            Value: name,
          }),
          // new CognitoUserAttribute({
          //   Name: 'gender',
          //   Value: gender,
          // }),
          // new CognitoUserAttribute({
          //   Name: 'birthdate',
          //   Value: birthdate,
          // }),
        ];

        userPool.signUp(
          name,
          password,
          newAttributes,
          [],
          async (error, result) => {
            console.log(email);
            if (error) {
              reject(error);
              console.error(error);
              return;
            }

            resolve(result.userSub);
          }
        );
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

  return (
    <CognitoContext.Provider
      value={{ isLoggedIn, login, register, confirmcode, resendCode, logout }}
    >
      {children}
    </CognitoContext.Provider>
  );
}
