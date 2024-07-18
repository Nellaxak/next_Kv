import Image from "next/image";
import '@/styles/globals.css'
import styles from "./page.module.css";
import bigImage from "./big.svg";

const SVG = () => {
    //<div className={styles.padding}></div>
    return (
        <div className={styles.image_wrapper}>
            <Image src={bigImage} alt="Earth"
                fill
            />
        </div>
    );
}
export default SVG