import { createServer, Model, RestSerializer } from 'miragejs';
import faker from 'faker';

faker.seed(28);

export function setupMockServer() {
	createServer({
		serializers: {
			application: RestSerializer,
		},

		models: {
			product: Model,
			cartItem: Model,
			wishListItem: Model,
		},

		routes() {
			this.namespace = 'api';
			this.timing = 200;
			this.resource('products');
			this.resource('cartItems');
			this.resource('wishListItems');
		},

		seeds(server) {
			[...Array(10)].forEach((_) => {
				server.create('product', {
					productId: faker.datatype.uuid(),
					name: faker.commerce.productName(),
					image: faker.random.image(),
					price: faker.commerce.price(),
					material: faker.commerce.productMaterial(),
					brand: faker.lorem.word(),
					inStock: faker.datatype.boolean(),
					fastDelivery: faker.datatype.boolean(),
					inWishList: false,
					ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
					discount: faker.random.arrayElement([0, 5, 15, 30]),
					offer: faker.random.arrayElement([
						'Save 50',
						'70% bonanza',
						'Republic Day Sale',
					]),
					idealFor: faker.random.arrayElement([
						'Men',
						'Women',
						'Girl',
						'Boy',
						'Senior',
					]),
					level: faker.random.arrayElement([
						'beginner',
						'amateur',
						'intermediate',
						'advanced',
						'professional',
					]),
					color: faker.commerce.color(),
				});
			});

			[...Array(2)].forEach((_) => {
				server.create('wishListItem', {
					productId: faker.datatype.uuid(),
					name: faker.commerce.productName(),
					image: faker.random.image(),
					price: faker.commerce.price(),
					material: faker.commerce.productMaterial(),
					brand: faker.lorem.word(),
					inStock: faker.datatype.boolean(),
					inWishList: true,
					fastDelivery: faker.datatype.boolean(),
					ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
					offer: faker.random.arrayElement([
						'Save 50',
						'70% bonanza',
						'Republic Day Sale',
					]),
					idealFor: faker.random.arrayElement([
						'Men',
						'Women',
						'Girl',
						'Boy',
						'Senior',
					]),
					level: faker.random.arrayElement([
						'beginner',
						'amateur',
						'intermediate',
						'advanced',
						'professional',
					]),
					color: faker.commerce.color(),
				});
			});

			[...Array(2)].forEach((_) => {
				server.create('cartItem', {
					productId: faker.datatype.uuid(),
					name: faker.commerce.productName(),
					image: faker.random.image(),
					price: faker.commerce.price(),
					material: faker.commerce.productMaterial(),
					brand: faker.lorem.word(),
					inStock: faker.datatype.boolean(),
					fastDelivery: faker.datatype.boolean(),
					quantity: 1,
					ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
					offer: faker.random.arrayElement([
						'Save 50',
						'70% bonanza',
						'Republic Day Sale',
					]),
					idealFor: faker.random.arrayElement([
						'Men',
						'Women',
						'Girl',
						'Boy',
						'Senior',
					]),
					level: faker.random.arrayElement([
						'beginner',
						'amateur',
						'intermediate',
						'advanced',
						'professional',
					]),
					color: faker.commerce.color(),
				});
			});
		},
	});
}
