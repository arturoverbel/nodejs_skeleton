var mongoose = require('mongoose');
var Product = require("../models/Product");

var productController = {};

productController.list = function(req, res){
    
    Product.find({}).exec(function(err, products){
        if( err ){ console.log('Error: ', err); return; }
        console.log("The INDEX");
        res.render('../views/product/index', {products: products} );
        
    });
    
};

productController.show = function(req, res){
    Product.findOne({_id: req.params.id}).exec(function(err, product){
        if( err ){ console.log('Error: ', err); return; }
        
        res.render('../views/product/show', {product: product} );
    });
    
};

productController.create = function(req, res){
    res.render('../views/product/create');
};

productController.save = function(req, res){
    var product = new Product( req.body );
    
    product.save(function(err){
        if( err ){ console.log('Error: ', err); return; }
        
        console.log("Successfully created a product. :)");
        res.redirect("/products/show/"+product._id);
        
    });
};

productController.edit = function(req, res) {
  Product.findOne({_id: req.params.id}).exec(function (err, product) {
    if (err) { console.log("Error:", err); return; }
    
    res.render("../views/product/edit", {product: product});
    
  });
};

productController.update = function(req, res){
    Product.findByIdAndUpdate( req.params.id, {$set: {
        name: req.body.name,
        price: req.body.price
    }}, { new: true },
    function( err, product){
        if( err ){ 
            console.log('Error: ', err); 
            res.render('../views/product/edit', {product: req.body} );
        }
        
        console.log( product );
        
        res.redirect('/products/show/' + product._id);
        
    });
};

productController.delete = function(req, res){
    
    Product.remove({_id: req.params.id}, function(err){
        if( err ){ console.log('Error: ', err); return; }
        
        console.log("Product deleted!");
        res.redirect("/products");
    });
    
};

module.exports = productController;