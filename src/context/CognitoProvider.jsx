  import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
  } from "react";
  import {
    CognitoUser,
    CognitoUserPool,
    CognitoUserAttribute,
    AuthenticationDetails,
  } from "amazon-cognito-identity-js";
  import { COGNITO_API } from "../config";
  import { signUpState } from "../recoil/RecoilState";
  import { useRecoilState } from "recoil";

  const userPool = new CognitoUserPool({
    UserPoolId: COGNITO_API.userPoolId || "",
    ClientId: COGNITO_API.clientId || "",
  });
  const CognitoContext = createContext();
  export const useCognito = () => useContext(CognitoContext);

  export function CognitoProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userAttributes, setUserAttributes] = useState(null);
    const [signUpInfo, setSignUpInfo] = useRecoilState(signUpState);
    const [cognitoUser, setCognitoUser] = useState(null);
    
    useEffect(() => {
      const checkLoggedIn = () => {
        const user = userPool.getCurrentUser();
        if (user) {
          setIsLoggedIn(true);
          setCognitoUser(user);
        }
      };
      checkLoggedIn();
    }, []);

    // 회원가입
    const register = useCallback(
      (name, email, age,gender, password) =>
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
            new CognitoUserAttribute({
              Name: "custom:gender",
              Value: gender,
            }),
            new CognitoUserAttribute({
              Name: "custom:stringage",
              Value: String(age),
            }),
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

    // 로그인
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
    // 로그아웃
    const logout = useCallback(() => {
      const cognitoUser = userPool.getCurrentUser();

      if (cognitoUser) {
        cognitoUser.signOut();
        setIsLoggedIn(false);
      }
    }, []);

    // 회원탈퇴
    const deleteUser = useCallback(() => {
      const cognitoUser = userPool.getCurrentUser();
      if (cognitoUser != null) {
        cognitoUser.getSession(function(err, session) {
          if (err) {
            console.log(err);
            // Handle error
          } else {
      
      cognitoUser.deleteUser(function (err, result) {
        if (err) {
          alert(err.message || JSON.stringify(err));
          return;
        }
        console.log("call result: " + result);
      });
    }})}
    }, []);

    // 유저의 정보 얻어오기
    const getUserAttributes = useCallback(() => {
      const cognitoUser = userPool.getCurrentUser();
      if (cognitoUser != null) {
        cognitoUser.getSession(function(err, session) {
          if (err) {
            console.log(err);
            // Handle error
          } else {
            cognitoUser.getUserAttributes(function(err, attributes) {
              if (err) {
                console.log(err);
                // Handle error
              } else {
                console.log(attributes);
                setUserAttributes(attributes);
    
                // Update signUpState with the received attributes
                const updatedSignUpState = {
                  ...signUpState,
                  name: attributes.find(attr => attr.Name === 'name')?.Value || '',
                  neighborhood: attributes.find(attr => attr.Name === 'neighborhood')?.Value || '',
                  age: attributes.find(attr => attr.Name === 'custom:stringage')?.Value || '',
                  gender: attributes.find(attr => attr.Name === 'custom:gender')?.Value || '',
                };
                setSignUpInfo(updatedSignUpState);
              }
            });
          }
        });
      }
    }, []);
    // 현재 로그인된 유저가 존재하는지 검증
    const getSession = useCallback(() => {
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser) {
      cognitoUser.getSession(function(err, session) {
        if (err) {
          console.log(err);
          // Handle error
        } else {
          console.log(session);
          console.log(cognitoUser);
            return true;
        }
      });
    }
  }, []);
    
    // verifycation code 검증
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

    //  verifycation code 다시보내기
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
        value={{
          isLoggedIn,
          login,
          register,
          confirmcode,
          resendCode,
          logout,
          deleteUser,
          getUserAttributes,
          getSession
        }}
      >
        {children}
      </CognitoContext.Provider>
    );
  }
