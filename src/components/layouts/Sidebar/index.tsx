import Link from "next/link";
import { useState } from "react";
import { Product } from '../../../constants/type/product';

const Sidebar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const toggleSidebar = () => {
		setIsOpen(!isOpen);
	};

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	return (
		<>
			<div
				className={`fixed top-0 left-0 h-full bg-gray-900 text-white transition-transform transform ${
				isOpen ? "translate-x-0" : "-translate-x-full"
				} w-64 z-30`}
			>
				<button
					onClick={toggleSidebar}
					className="absolute text-2xl top-4 right-4 focus:outline-none"
				>
					{isOpen ? "×" : "☰"}
				</button>
				<div className="p-5">
					<h3 className="pt-10 pl-4 mb-4 text-xl font-bold">Toko Biru</h3>
					<ul>
						<Link href={"/"}><li className="px-4 py-2 hover:bg-gray-950">Home</li></Link>
						<Link href="/profile"><li className="px-4 py-2 hover:bg-gray-950">Account</li></Link>
						<Link href={"/carts"}><li className="px-4 py-2 hover:bg-gray-950">Cart</li></Link>
						<li>
							<button
								onClick={toggleDropdown}
								className="w-full px-4 py-2 text-left hover:bg-gray-950"
							>
								Product
							</button>
							{isDropdownOpen && (
								<ul className="pl-4 bg-gray-950">
									<Link href="/products"><li className="px-4 py-2 hover:bg-gray-950">Search Product</li></Link>
									<Link href="/products/add"><li className="px-4 py-2 hover:bg-gray-950">Add Product</li></Link>
								</ul>
							)}
						</li>
						<Link href={"/auth/signout"}><li className="px-4 py-2 hover:bg-gray-950">Sign Out</li></Link>
					</ul>
				</div>
			</div>
			<button
				onClick={toggleSidebar}
				className={`fixed top-4 left-4 z-40 text-2xl focus:outline-none ${
				isOpen ? "hidden" : "block"
				}`}
			>
				☰
			</button>
		</>
	);
};

export default Sidebar;
