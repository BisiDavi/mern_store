import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import {
  Layout,
  Order,
  Payment,
  Login,
  Profile,
  Product,
  Register,
  Cart,
  UserList,
  UserEdit,
  ProductList,
  ProductEdit,
  OrderList,
  Home,
  Shipping,
  PlaceOrder
} from '../imports';

const AppRoutes = () => {
  return (
    <Router>
      <Layout>
        <main className="py-3">
          <Container>
            <Route path="/order/:id" component={Order} />
            <Route path="/shipping" component={Shipping} />
            <Route path="/payment" component={Payment} />
            <Route path="/placeorder" component={PlaceOrder} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/profile" component={Profile} />
            <Route path="/product/:id" component={Product} />
            <Route path="/cart/:id?" component={Cart} />
            <Route path="/admin/userlist?" component={UserList} />
            <Route path="/admin/user/:id/edit?" component={UserEdit} />
            <Route path="/admin/productlist" component={ProductList} exact />
            <Route
              path="/admin/productlist/:pageNumber"
              component={ProductList}
              exact
            />
            <Route path="/admin/product/:id/edit" component={ProductEdit} />
            <Route path="/admin/orderlist" component={OrderList} />
            <Route path="/search/:keyword" component={Home} exact />
            <Route path="/page/:pageNumber" component={Home} exact />
            <Route
              path="/search/:keyword/page/:pageNumber"
              component={Home}
              exact
            />
            <Route path="/" component={Home} exact />
          </Container>
        </main>
      </Layout>
    </Router>
  );
};

export default AppRoutes;
