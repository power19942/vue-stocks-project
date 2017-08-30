<template>
  <div class="col-sm-6 col-md-4">
    <div class="panel panel-success">
      <div class="panel-heading">
        <h3 class="panel-title">{{stock.name}} <small>(price: {{stock.price}} | QTY {{stock.qty}})</small></h3>
      </div>
      <div class="panel-body">
        <div class="pull-left">
          <input  v-model="qty" type="number" class="form-control" :class="{danger:insufficientQty}" placeholder="Qty">
        </div>
        <div class="pull-right">
          <button 
           class="btn btn-success" 
           :disabled="insufficientQty || qty <= 0"
           @click="sellStock">{{insufficientQty ? "Not enough Stocks" : "Sell"}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
export default {
  props:['stock'],
  data(){
    return{
      qty:0
    }
  },
  computed:{
    insufficientQty(){
      return this.qty > this.stock.qty;
    }
  },
  methods:{
    ...mapActions({
        placeSellOrder:'sellStock'
    }),
    sellStock(){
      const order = {
        stockId:this.stock.id,
        stockPrice:this.stock.price,
        qty:this.qty
      };
      this.placeSellOrder(order);
      this.qty = 0
    }
  }
}
</script>

<style scoped>
  .danger{
    border:1px solid red
  }
</style>
