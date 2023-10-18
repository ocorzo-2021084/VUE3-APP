import { defineStore } from "pinia";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, db, storage } from "../firebaseConfig.js";
import router from "../router";
import { userDatabaseStore } from "./database.js";
import { doc, getDoc, setDoc } from "firebase/firestore/lite";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    userData: null,
    loadingUser: false,
    loadingSession: false,
  }),
  actions: {
    async registerUser(email, password) {
      this.loadingUser = true;
      try {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        this.userData = { email: user.email, uid: user.uid };
        router.push("/");
      } catch (error) {
        console.log(error.code);
        return error.code;
      } finally {
        this.loadingUser = false;
      }
    },
    async updateImg(imagen) {
      try {
        console.log(imagen);
        const storageRef = ref(storage, `${this.userData.uid}/perfil`);
        await uploadBytes(storageRef, imagen.originFileObj);
        const photoURL = await getDownloadURL(storageRef);
        await updateProfile(auth.currentUser, {
          photoURL: photoURL,
        });
      } catch (error) {
        console.log(error);
        return error.code;
      }
    },
    async updateUser(displayName) {
      try {
        await updateProfile(auth.currentUser, {
          displayName: displayName,
        });
        this.setUser(auth.currentUser);
      } catch (error) {
        console.log(error);
        return error.code;
      }
    },
    async setUser(user) {
      try {
        const docRef = doc(db, "users", user.uid);

        this.userData = {
          email: user.email,
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        };

        await setDoc(docRef, this.userData);
      } catch (error) {
        console.log(error);
      }
    },
    async loginUser(email, password) {
      this.loadingUser = true;
      try {
        const { user } = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        this.setUser(user);
        router.push("/");
      } catch (error) {
        console.log(error.code);
        return error.code;
      } finally {
        this.loadingUser = false;
      }
    },
    async logoutUser() {
      const databaseStore = userDatabaseStore();
      databaseStore.$reset();
      try {
        router.push("/login");
        await signOut(auth);
      } catch (error) {
        console.log(error);
      }
    },
    currentUser() {
      return new Promise((resolve, reject) => {
        const unsuscribe = onAuthStateChanged(
          auth,
          async (user) => {
            if (user) {
              console.log(user);
              // await this.setUser(user);
              this.userData = {
                email: user.email,
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL,
              };
            } else {
              this.userData = null;
              const databaseStore = useUserStore();
              databaseStore.$reset();
            }
            resolve(user);
          },
          (e) => reject(e)
        );
        unsuscribe();
      });
    },
  },
});
