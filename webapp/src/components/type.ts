export type Category = {
	id: number;
	name: string;
	products: Product[];
};

export type Product = {
	id: number;
	name: string;
	description: string;
	price: number;
	tags: string[];
	imageUrl: string;
};

export type CartItem = Product & {
	quantity: number;
};
