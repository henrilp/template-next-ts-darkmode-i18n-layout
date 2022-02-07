import useTranslation from "next-translate/useTranslation";
import styles from "./footer.module.scss";
import LinkedIn from "svg/socialMedia/linkedin.svg";
import Github from "svg/socialMedia/github.svg";
import Malt from "svg/socialMedia/malt.svg";

export default function Footer() {
  const { t } = useTranslation("common");
  return (
    <section className={styles.container + " row spaced aligned fullWidth"}>
      <div className="row-only aligned">
        <a
          className={`iconButton ${styles.horizontalMargin}`}
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.linkedin.com/in/henri-le-page-512932130/"
          title="LinkedIn"
        >
          <LinkedIn className="icon" fill="white" />
        </a>
        <a
          className={`iconButton ${styles.horizontalMargin}`}
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/henrilp"
          title="Github"
        >
          <Github className="icon" fill="white" />
        </a>
        <a
          className={`iconButton ${styles.horizontalMargin}`}
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.malt.fr/profile/henrilepage"
          title="Malt"
        >
          <Malt className="icon" fill="white" />
        </a>
      </div>
      <div className="row-only aligned">
        <span className={styles.text}>{t("madeWith")}</span>
      </div>
    </section>
  );
}
