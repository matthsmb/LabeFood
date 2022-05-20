import { CardActionArea, Typography } from "@material-ui/core";
import { ArrowBackIos } from "@material-ui/icons";
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/header/Header";
import { GlobalContext } from "../../global/GlobalContext";
import { ProductCard } from "./productCard/ProductCard";
import { P, CardMediaImg, ContainerCardDetail } from "./styled";
import Loading from '../../components/Loading/Loading'
import useProtectdPage from "../../hooks/useProtectedPage"

function RestaurantDetailsPage() {
  useProtectdPage()

  const params = useParams();
  const { states, requests, setters } = useContext(GlobalContext);

  const restaurantProducts = states.restaurantDetail?.restaurant.products
    .map((product) => {
      if (product.category !== "Bebida") {
        return <ProductCard params={params.restaurantId} key={product.id} product={product} />
      }
    })


  const restaurantDrinks = states.restaurantDetail?.restaurant.products
    .map((product) => {
      if (product.category === "Bebida") {
        return <ProductCard params={params.restaurantId} key={product.id} product={product} />
      }
    })

  useEffect(() => {
    requests.getRestaurantDetail(params.restaurantId);
    setters.setHeaderText("Restaurante");
    setters.setHeaderButton(<ArrowBackIos />);
  }, []);

  return (
    <div>
      <Header />
      {states.restaurantDetail?.restaurant.logoUrl && restaurantProducts && restaurantDrinks
        ?
        <ContainerCardDetail>
          <CardActionArea>
            <CardMediaImg
              component="img"
              alt="logo da loja"
              height="150"
              image={states.restaurantDetail?.restaurant.logoUrl}
              title="Nome da loja"
            />
            <br />
            <Typography gutterBottom variant="h6" color="primary">
              {states.restaurantDetail?.restaurant.name}
            </Typography>

            <Typography size="small" color="secondary">
              <p>{states.restaurantDetail?.restaurant.category}</p>
              <P>{states.restaurantDetail?.restaurant.deliveryTime} min <p>Frete R${states.restaurantDetail?.restaurant.shipping.toFixed(2)}</p></P>
              <p></p>
              <p>{states.restaurantDetail?.restaurant.address}</p>
            </Typography>
          </CardActionArea>
          <h3>Pratos principais</h3>
          <hr />
          {restaurantProducts}

          <h3>Bebidas</h3>
          <hr />
          {restaurantDrinks}
        </ContainerCardDetail>
        :
        <Loading />
      }
    </div>
  );
}

export default RestaurantDetailsPage;
