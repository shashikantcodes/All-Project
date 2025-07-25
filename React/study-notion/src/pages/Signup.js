import React from 'react';
import Template from '../Components/Template';
import signupImg from '../assets/signup.png';

const Signup = ({ setIsLoggedIn }) => {
    return (
        <div>
            <Template
                title="Join the millions of learning to code With studyNotion for free"
                desc1="Build skills for today,tommorow and beyond."
                desc2="Education to future-proof your Career."
                image={signupImg}
                formtype="signup"
                setIsLoggedIn={setIsLoggedIn}
            />

        </div>
    );
};

export default Signup;