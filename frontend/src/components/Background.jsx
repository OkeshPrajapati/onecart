
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