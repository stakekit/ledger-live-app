import { Box } from "../components/atoms/box";
import { Header } from "./header";
import { container } from "./style.css";
import { Widget } from "./widget";

export default function Home() {
	return (
		<Box className={container}>
			<Header />
			<Widget />
		</Box>
	);
}
