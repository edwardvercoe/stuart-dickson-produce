type BurgerButtonProps = {
	isMenuOpen: boolean;
	setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const BurgerButton = ({ isMenuOpen, setIsMenuOpen }: BurgerButtonProps) => {
	return (
		<div
			className={`relative burger-button ${isMenuOpen ? "burger-button__active" : ""}`}
			onClick={() => {
				setIsMenuOpen(!isMenuOpen);
			}}
		>
			<button>
				<div></div>
				<div></div>
				<div></div>
			</button>
		</div>
	);
};
export default BurgerButton;
