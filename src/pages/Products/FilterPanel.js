import { useState } from 'react';

export function FilterPanel({
    dispatchWrapper,
    showFastDeliveryOnly,
    showOutOfStock,
}) {
    const [showRefineSearch, setShowRefineSearch] = useState(false);
    return (
        <div className="border-shadow padding1">
            <div className="flex-space-between">
                <span className="bold-font-weight">Refine Search</span>
                <button
                    className="show-search-options"
                    onClick={() => setShowRefineSearch(!showRefineSearch)}
                >
                    <i className="fas fa-chevron-down fa-lg"></i>
                </button>
            </div>
            {/* //todo fix this hack */}
            <div
                className="refine-search"
                style={{ display: showRefineSearch ? 'flex' : 'none' }}
            >
                <div className="filter-group">
                    <p className="bold-font-weight">Price</p>
                    <label className="light-font-weight">
                        <input
                            type="radio"
                            name="sort"
                            onClick={() =>
                                dispatchWrapper({
                                    type: 'SORT_PRODUCTS_BY_PRICE',
                                    payload: 'HIGH_TO_LOW',
                                })
                            }
                        />
                        High To Low
                    </label>
                    <label className="light-font-weight">
                        <input
                            type="radio"
                            name="sort"
                            onClick={() =>
                                dispatchWrapper({
                                    type: 'SORT_PRODUCTS_BY_PRICE',
                                    payload: 'LOW_TO_HIGH',
                                })
                            }
                        />
                        Low To High
                    </label>
                </div>

                <div className="filter-group">
                    <p className="bold-font-weight">Filter</p>
                    <label className="light-font-weight">
                        <input
                            type="checkbox"
                            checked={showFastDeliveryOnly}
                            onChange={() =>
                                dispatchWrapper({
                                    type: 'TOGGLE_SHOW_FAST_DELIVERY_ONLY',
                                })
                            }
                        />
                        Fast Delivery Only
                    </label>
                    <label className="light-font-weight">
                        <input
                            type="checkbox"
                            checked={showOutOfStock}
                            onChange={() =>
                                dispatchWrapper({
                                    type: 'TOGGLE_SHOW_OUT_OF_STOCK',
                                })
                            }
                        />
                        In Stock Only
                    </label>
                </div>
            </div>
            <div className="refine-search">
                <div className="refine-search">
                    <div className="filter-group">
                        <p className="bold-font-weight">Price</p>
                        <label className="light-font-weight">
                            <input
                                type="radio"
                                name="sort"
                                onClick={() =>
                                    dispatchWrapper({
                                        type: 'SORT_PRODUCTS_BY_PRICE',
                                        payload: 'HIGH_TO_LOW',
                                    })
                                }
                            />
                            High To Low
                        </label>
                        <label className="light-font-weight">
                            <input
                                type="radio"
                                name="sort"
                                onClick={() =>
                                    dispatchWrapper({
                                        type: 'SORT_PRODUCTS_BY_PRICE',
                                        payload: 'LOW_TO_HIGH',
                                    })
                                }
                            />
                            Low To High
                        </label>
                    </div>

                    <div className="filter-group">
                        <p className="bold-font-weight">Filter</p>
                        <label className="light-font-weight">
                            <input
                                type="checkbox"
                                checked={showFastDeliveryOnly}
                                onChange={() =>
                                    dispatchWrapper({
                                        type: 'TOGGLE_SHOW_FAST_DELIVERY_ONLY',
                                    })
                                }
                            />
                            Fast Delivery Only
                        </label>
                        <label className="light-font-weight">
                            <input
                                type="checkbox"
                                checked={showOutOfStock}
                                onChange={() =>
                                    dispatchWrapper({
                                        type: 'TOGGLE_SHOW_OUT_OF_STOCK',
                                    })
                                }
                            />
                            In Stock Only
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}
