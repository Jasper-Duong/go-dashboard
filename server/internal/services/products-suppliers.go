package services

import (
	"server/internal/db"
	"server/internal/models"
)

var GetProductStocks = func(id uint32) ([]map[string]interface{}, error) {
	stocks, err := models.GetSuppliersByProductID(db.DB, uint32(id))
	return stocks, err
}

var GetSupplierStocks = func(id uint32) ([]map[string]interface{}, error) {
	stocks, err := models.GetProductsBySupplierID(db.DB, uint32(id))
	return stocks, err
}

var GetSupplierMissingProducts = func(id uint32) ([]map[string]interface{}, error) {
	products, err := models.GetProductsBySupplierID(db.DB, id)
	if err != nil {
		return nil, err
	}

	var ids []uint32 = make([]uint32, 0)
	ids = append(ids, 0)
	for _, product := range products {
		ids = append(ids, product["id"].(uint32))
	}

	missing, err := models.GetSupplierMissingProducts(db.DB, ids)
	if err != nil {
		return nil, err
	}

	return missing, nil
}

var GetProductMissingSuppliers = func(id uint32) ([]map[string]interface{}, error) {
	suppliers, err := models.GetSuppliersByProductID(db.DB, id)
	if err != nil {
		return nil, err
	}

	var ids []uint32 = make([]uint32, 0)
	ids = append(ids, 0)
	for _, supplier := range suppliers {
		ids = append(ids, supplier["id"].(uint32))
	}

	missing, err := models.GetProductMissingSuppliers(db.DB, ids)
	if err != nil {
		return nil, err
	}

	return missing, nil
}

var CreateStock = func(stock models.StockRequest) error {
	product_supplier := &models.ProductsSuppliers{
		ProductID:  stock.ProductID,
		SupplierID: stock.SupplierID,
		Stock:      stock.Stock,
	}
	return models.CreateStock(db.DB, product_supplier)
}

var UpdateStock = func(stock models.StockRequest) error {
	return models.UpdateStock(db.DB, stock.ProductID, stock.SupplierID, *stock.Stock)
}

var DeleteStock = func(product_id uint32, supplier_id uint32) error {
	return models.DeleteStock(db.DB, product_id, supplier_id)
}
