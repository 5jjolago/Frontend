import { atom, useRecoilValue } from 'recoil';
import { recoilPersist } from "recoil-persist";
const sessionStorage =
  typeof window !== "undefined" ? window.sessionStorage : undefined;
  const { persistAtom } = recoilPersist({
    key: "signUpState",
    storage: sessionStorage,
  });
  
// 리코일 새로고침 데이터 삭제 방지
export const signUpState = atom({
    key: 'signUpState',
    default: {
        name: '',
        neighborhood: '',
        age: '',
        gender: '',
    },
    effects_UNSTABLE: [persistAtom],
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
    // console.log("Sign Up State:", signUpInfo);
}
