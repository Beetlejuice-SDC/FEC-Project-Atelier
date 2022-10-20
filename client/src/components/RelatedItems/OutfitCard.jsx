import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OutfitCard = ({ outfit, calcRating, saleAndImageSetter, renderPrice, updateProduct, removeOutfit, getProductReviews }) => {
  const [product, setProduct] = useState(outfit);
  const [rating, setRating] = useState();
  const [originalPrice, setOriginalPrice] = useState();
  const [salesPrice, setSalesPrice] = useState(null);
  const [imgURL, setImgURL] = useState();

  useEffect(() => {
    // console.log('prodReviews', getProductReviews(product.id))
    const reviews = getProductReviews(product.id);
    const avgRating = calcRating(reviews);
    setRating(avgRating)

    // axios.get(`/reviews/${product.id}`)
    //   .then(result => {
    //     let reviews = result.data.results;
    //     setRating(calcRating(reviews));
    //   });

    axios.get(`/products/${product.id}/styles`)
      .then(result => {
        let styles = result.data.results;
        const { sale, ogPrice, thumbnailURL } = saleAndImageSetter(styles);

        setOriginalPrice(ogPrice);
        setSalesPrice(sale);
        setImgURL(thumbnailURL);
      });
  }, []);

  return (
    <div className="card card-shadow" onClick={() => updateProduct(event, product)}>
      <button
        className="favorite-icon"
        value={product.id}
        onClick={removeOutfit}>
        ❌
      </button>
      <div className="card-image">
        {imgURL === null && <div className="no-image">Image not available</div>}
        {imgURL && <img src={imgURL}/>}
      </div>
      <p className="card-category">{outfit.category}</p>
      <div className="card-name">{outfit.name}</div>
      {renderPrice(salesPrice, originalPrice)}
      <div className="card-rating">{rating}</div>
    </div>
  );
};

export default OutfitCard;