import { useState } from "react"
import Head from "next/head"
import Layout, { name } from "components/layout"
import Image from "next/image"
import useTranslation from "next-translate/useTranslation"
import Trans from "next-translate/Trans"
import Section from "components/section"
import Button from "components/Button/button"

export default function Home() {
	// @ts-ignore
	const { t } = useTranslation(["home", "common"])
	const [highlightedIndex, setHighlightedIndex] = useState(-1)

	// TODO : resize portrait + css + make arrow down clickable to scroll

	return (
		<Layout>
			<Section downScroll>
				<h1>{t("home:title")}</h1>
				<p style={{ fontStyle: "italic", marginBottom: "1rem" }}>
					{t("home:intro")}
				</p>
				<div className="row spaced aligned positioned fullWidth">
					<figure>
						<Image
							className="circle"
							priority
							src="/images/portrait_2021.jpg"
							width={300}
							height={300}
							alt={t("home:particularAlt")}
						/>
						<figcaption>{t("home:portraitAlt")}</figcaption>
					</figure>
				</div>
			</Section>
			<Section footer>hello</Section>
		</Layout>
	)
}
