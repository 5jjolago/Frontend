// RecoilState.js

import { atom } from 'recoil';

export const signUpState = atom({
    key: 'signUpState',
    default: {
        name: '',
        neighborhood: '',
        age: '',
        gender: '',
    },
});
export const resetSignUpState = () => {
    return {
        name: '',
        neighborhood: '',
        age: '',
        gender: '',
    };
};
export function useSignUpStateLogger() {
    const signUpInfo = useRecoilValue(signUpState);
    console.log("Sign Up State:", signUpInfo);
}