import React from "react";
import { Amplify } from "aws-amplify";
import { Authenticator  } from "@aws-amplify/ui-react";
import awsconfig from "../aws-exports";

Amplify.configure(awsconfig);


const SignUpIn = () => {
  return (
    <Authenticator >
    <div>
      ONLY LOGGED IN USERS CAN SEE THIS
    </div>
  </Authenticator >
   
  );
};

export default SignUpIn;
