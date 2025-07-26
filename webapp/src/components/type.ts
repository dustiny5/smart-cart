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

type CheckoutItem = {
	name: string;
	price: number;
	quantity: number;
};

export type CheckoutRequestBody = {
	items: CheckoutItem[];
};

export type CheckoutResponse = {
	sessionId: string;
	sessionUrl: string;
	message: string;
};
