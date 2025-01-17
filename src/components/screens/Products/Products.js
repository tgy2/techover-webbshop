import React, { useEffect } from 'react';
import { Typography, Container, Grid, Button } from '@mui/material';
import useStyles from './styles';
import { connect } from 'react-redux';
import ProductCard from '../../ProductCard/ProductCard';
import { incrementProduct, decrementProduct } from '../../../reduxStore/actions/cartActions';
import { useParams } from 'react-router-dom';
import Sidebar from '../../Sidebar/Sidebar';

const Products = ({ products, loading, error, orders }) => {
	const classes = useStyles();

	const { category } = useParams();

	const renderProductCards = () => {
		if (loading) return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((d) => <ProductCard loading={loading} key={d} />);
		let array = products.map((item, i) => {
			const order = orders.find((el) => el.product.id === item.id);
			const quantity = order ? order.quantity : null;

			return (
				<ProductCard
					{...item}
					loading={loading}
					key={i}
					isLast={i === products.length - 1}
					quantity={quantity}
				/>
			);
		});

		if (category) {
			array = array.filter((item) => {
				const s = item.props.category.replace(/[^A-Z0-9]/gi, '');

				return s == category;
			});
		}

		if (array.length <= 1) {
			return <h1>Category not found</h1>;
		} else {
			return array;
		}
	};

	return (
		<div id="Product__screen">
			<Grid container>
				<Grid item xs={2}>
					<Sidebar />
				</Grid>
				<Grid item xs={8}>
					<div className="Products__view">
						<div className={classes.productHeader}>
							<Typography variant="h1" className={classes.productsTitle}>
								Välj varor
							</Typography>
						</div>
						<Grid container spacing={2} justify="center">
							<Grid item xs={12}>
								{renderProductCards()}
							</Grid>
						</Grid>
					</div>
				</Grid>
			</Grid>
		</div>
	);
};

const mapState = (state) => {
	const { items, loading, error } = state.products;
	return { products: items, loading, error, orders: state.cart.orders };
};

export default connect(mapState)(Products);
