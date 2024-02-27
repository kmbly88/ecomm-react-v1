import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";

import { 
    auth,
    signInWithGooglePopup, 
    signInWithGoogleRedirect,
    createUserDocumentFromAuth } 
    from "../../utils/firebase/firebase.utils";

const SignIn = () => {

  useEffect(() => {
    (async () => {
      const response = await getRedirectResult(auth);
      if (response) {
        const userDocRef = await createUserDocumentFromAuth(response.user);
      }
    })();
  }, []);

    const logGoogleUser = async () => {
            // destructure off response the individual login user
            const { user }  = await signInWithGooglePopup();
            // console.log(response);
            const userDocRef = await createUserDocumentFromAuth(user);
    };

    return (
      <div>
        <h1>Sign In Page</h1>
        <button onClick={logGoogleUser}>Google Popup</button>
        <button onClick={signInWithGoogleRedirect}>Google Redirect</button>
      </div>
    );

};

export default SignIn;