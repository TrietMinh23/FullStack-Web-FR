import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";

export default function Review ( {review, seeStar}) {
    const [review1, setReview1] = useState([]);
    const [review2, setReview2] = useState([]);
    const [review3, setReview3] = useState([]);
    const [review4, setReview4] = useState([]);
    const [review5, setReview5] = useState([]);
    useEffect(() => {
        const filteredReviews5 = review.filter((re) => re.rating.star === 5);
        setReview5(filteredReviews5);
        const filteredReviews4 = review.filter((re) => re.rating.star === 4);
        setReview4(filteredReviews4);
        const filteredReviews3 = review.filter((re) => re.rating.star === 3);
        setReview3(filteredReviews3);
        const filteredReviews2 = review.filter((re) => re.rating.star === 2);
        setReview2(filteredReviews2);
        const filteredReviews1 = review.filter((re) => re.rating.star === 1);
        setReview1(filteredReviews1);
      }, [review]);
    return (
        <div>
            {seeStar === 0 && (
                <>
                    <div>
                        <div>
                            {review.map((item, index) => {
                                return (
                                    <div key={index} className="border p-2">
                                        <div>{item.buyer.name}</div>
                                        <div>
                                            <Rating
                                                name="sstar"
                                                readOnly
                                                value={item.rating.star}
                                          />
                                        </div>
                                        <div>{item.rating.comment}</div>
                                    </div>
                                      );
                                  })}
                        </div>
                    </div>
                </>
                )}
            {seeStar === 5 && (
                <>
                    <div>
                        {review5.map((item, index) => {
                            return (
                                <div key={index} className="border p-2">
                                    <div>{item.buyer.name}</div>
                                    <div>
                                      <Rating
                                        name="read-only"
                                        readOnly
                                        value={item.rating.star}
                                      />
                                    </div>
                                    <div>{item.rating.comment}</div>
                                  </div>
                                );
                        })}
                    </div>
                </>
                )}
            {seeStar === 4 && (
                <>
                    <div>
                        {review4.map((item, index) => {
                            return (
                              <div key={index} className="border p-2">
                                <div>{item.buyer.name}</div>
                                <div>
                                  <Rating
                                    name="read-only"
                                    readOnly
                                    value={item.rating.star}
                                  />
                                </div>
                                <div>{item.rating.comment}</div>
                              </div>
                            );
                          })}
                        </div>
                      </>
                    )}
            {seeStar === 3 && (
                <>
                    <div>
                        {review3.map((item, index) => {
                        return (
                            <div key={index} className="border p-2">
                            <div>{item.buyer.name}</div>
                            <div>
                              <Rating
                                name="read-only"
                                readOnly
                                value={item.rating.star}
                              />
                            </div>
                            <div>{item.rating.comment}</div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
            {seeStar === 2 && (
                <>
                    <div>
                       {review2.map((item, index) => {
                            return (
                              <div key={index} className="border p-2">
                                <div>{item.buyer.name}</div>
                                <div>
                                  <Rating
                                    name="read-only"
                                    readOnly
                                    value={item.rating.star}
                                  />
                                </div>
                                <div>{item.rating.comment}</div>
                              </div>
                            );
                          })}
                        </div>
                      </>
                    )}
            {seeStar === 1 && (
                <>
                    <div>
                        {review1.map((item, index) => {
                            return (
                              <div key={index} className="border p-2">
                                <div>{item.buyer.name}</div>
                                <div>
                                  <Rating
                                    name="read-only"
                                    readOnly
                                    value={item.rating.star}
                                  />
                                </div>
                                <div>{item.rating.comment}</div>
                              </div>
                            );
                          })}
                        </div>
                      </>
                    )}
        </div>
  )
}

