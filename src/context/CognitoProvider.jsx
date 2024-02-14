import { createContext, useCallback, useContext } from 'react';
import {
  CognitoUser,
  CognitoUserPool,
  CognitoUserAttribute,
  AuthenticationDetails,
} from 'amazon-cognito-identity-js';
import { COGNITO_API } from '../config';

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

	// REGISTER
  const register = useCallback(
    (name, email, password, age, gender, location ) =>
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
            Value: location,
          }),
          new CognitoUserAttribute({
            Name: 'birthdate',
            Value: location,
          }),

        ];

        userPool.signUp(name, password, newAttributes, [], async (error, result) => {
          if (error) {
            console.log(email)
            reject(error);
            console.error(error);
            return;
          }

          resolve(result.userSub);
        });
      }),
    []
  );

	// Verify code
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
    <CognitoContext.Provider value={{ login, register, confirmcode, resendCode, logout }}>
    {children}
  </CognitoContext.Provider>
  )
}
