<template>
  <div class="col-sm-6 col-md-4">
    <div class="panel panel-success">
      <div class="panel-heading">
        <h3 class="panel-title">{{stock.name}} <small>(price: {{stock.price}})</small></h3>
      </div>
      <div class="panel-body">
        <div class="pull-left">
          <input  v-model="qty" type="number" :class="{danger:insufficientfunds,'form-control':true}" placeholder="Qty">
        </div>
        <div class="pull-right">
          <button 
           class="btn btn-success" 
           :disabled="insufficientfunds || qty <= 0"
           @click="buyStock">{{insufficientfunds ? 'Insufficient Funds' : 'Buy'}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:['stock'],
  data(){
    return{
      qty:0
    }
  },
  computed:{
    funds(){
      return this.$store.getters.funds;
    },
    insufficientfunds(){
      return this.qty * this.stock.price > this.funds;
    }
  },
  methods:{
    buyStock(){
      const order = {
        stockId : this.stock.id,
        stockPrice : this.stock.price,
        qty : this.qty,
      }
      this.$store.dispatch('buyStock',order);
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
