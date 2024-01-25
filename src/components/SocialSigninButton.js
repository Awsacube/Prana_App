import React from 'react';
import Custombutton from './Custombutton';

const SocialSigninButton = () => {
  const OnSignInWithGoogle = () => {
    console.warn('google');
  };

  const OnSignupsignInWithFacebook = () => {
    console.warn('fb');
  };
  return (
    <>
      <Custombutton
        text="Sign In With Facebook"
        onPress={OnSignupsignInWithFacebook}
        bgColor="#E7EAF4"
        fgColor="#4569A1"
      />
      <Custombutton
        text="Sign In With Google"
        onPress={OnSignInWithGoogle}
        bgColor="#fae9ea"
        fgColor="#dd4d44"
      />
    </>
  );
};

export default SocialSigninButton;
