// import React from 'react'
// import back0 from "../assets/imgs0.png";
// import back1 from "../assets/imgs1.png";
// import back2 from "../assets/imgs2.png";
// import back3 from "../assets/imgs3.png";

// const Background = ({heroCount}) => {

//     if(heroCount === 0 ){
//         return <img src={back0} alt='' className='w-[100%] h-[100%] float-left overflow-auto object-cover' />
//     }

//     else if(heroCount === 1 ){
//         return <img src={back1} alt='' className='w-[100%] h-[100%] float-left overflow-auto object-cover' />
//     }

//   else if(heroCount === 2 ){
//         return <img src={back2} alt='' className='w-[100%] h-[100%] float-left overflow-auto object-cover' />
//     }
//     if(heroCount === 3 ){
//         return <img src={back3} alt='' className='w-[100%] h-[100%] float-left overflow-auto object-cover' />
//     }
    

// }

// export default Background

import back0 from "../assets/imgs0.png";
import back1 from "../assets/imgs1.png";
import back2 from "../assets/imgs2.png";
import back3 from "../assets/imgs3.png";

const images = [back0, back1, back2, back3];

const Background = ({ heroCount }) => {
  return (
    <div className="absolute inset-0">
      <img
        src={images[heroCount]}
        alt="hero background"
        className="w-full h-full object-cover transition-all duration-700"
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
    </div>
  );
};

export default Background;