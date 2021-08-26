module.exports=function cart(cart_old){
    
    this.items=cart_old.items||[]
    this.total_price=cart_old.total_price||0
    this.add = function (product,id){
        const index=this.items.findIndex(x => x.id === id)
        if(index <0)
        {
            this.items.push({id:id,qty:1,item:product})
        } else{
            this.items[index].qty++
        }

        this.total_price+=product.price
    }
    this.delete=function(id){
        const index=this.items.findIndex(x => x.id === id)
        this.total_price-=this.items[index].item.price*this.items[index].qty
        this.items.splice(index,1);
        
        
    }
    this.increase=(id)=>{
        const index=this.items.findIndex(x => x.id === id)
        this.total_price+=this.items[index].item.price
        this.items[index].qty++
    }
    this.reduce=(id)=>{
        const index=this.items.findIndex(x => x.id === id)
        this.total_price-=this.items[index].item.price
        this.items[index].qty--
        if(this.items[index].qty<=0){
            this.items.splice(index,1)
        }
    }


}
