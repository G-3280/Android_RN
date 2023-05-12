import auth from "@react-native-firebase/auth";

// 로그인
export function signIn({email, password}) {
  return auth().signInWithEmailAndPassword(email, password);
}

// 로그아웃
export function signUp({email, password}) {
  return auth().createUserWithEmailAndPassword(email, password);
}

// 앱 가동, 로그인 상태 변경 시 사용자 정보 받아오는 함수
export function subscribeAuth(callback) {
  return auth().onAuthStateChanged(callback);
}

//로그 아웃
export function signOut() {
  return auth().signOut();
}