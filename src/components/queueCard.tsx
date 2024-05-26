import { motion } from "framer-motion";
import { childAnimation } from "../views/home/animation";

const QueueCard = ({ title, num, bg, animation }: any) => {
  return (
    <motion.div
      variants={animation && childAnimation}
      initial={`${animation && "hidden"}`}
      whileInView={animation && "visible"}
      transition={animation && { duration: 0.75 }}
      className={` items-center px-[10px] h-[200px] grid grid-cols-2 ml-[5px]  rounded-[8px] `}
      style={{ background: bg }}
    >
      <div className="bg-white text-[#2EA006] font-bold  rounded-[12px] text-[110px] flex items-center justify-center h-[90%]">
        {title}
      </div>
      <div className="flex items-center font-bold text-white justify-center text-[110px] h-[90%]">
        {num}
      </div>
    </motion.div>
  );
};
export default QueueCard;
