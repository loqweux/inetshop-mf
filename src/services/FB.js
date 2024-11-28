import {
  getDatabase,
  ref,
  onValue,
  push,
  set,
  remove,
  update,
} from "firebase/database";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../firebaseConfig.json";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);

export async function registerUser(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const userId = userCredential.user.uid;
    await set(ref(database, `users/${userId}`), { email, password });
    return userCredential;
  } catch (error) {
    console.error("Ошибка во время регистрации:", error.code, error.message);
    throw error;
  }
}

export async function loginUser(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function logoutUser() {
  return signOut(auth);
}

export function getData(path) {
  const starCountRef = ref(database, "/" + path);
  return new Promise((resolve, reject) => {
    onValue(
      starCountRef,
      (snapshot) => {
        const data = snapshot.val();
        resolve(data);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

export function addCart(item) {
  const dataRef = ref(database, "/cart");
  return push(dataRef, item);
}

export function editProductItemBasket(item, id) {
  const itemRef = ref(database, `/cart/${id}`);
  return set(itemRef, item);
}

export function removeProductItemFromBasket(id) {
  const itemRef = ref(database, `/cart/${id}`);
  return remove(itemRef);
}

export function updateItemCart(item, key) {
  const dataRef = ref(database, "/cart/" + key);
  return update(dataRef, item);
}
