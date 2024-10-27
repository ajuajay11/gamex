<template>
    <div class="container">
        <div class="row">
            <div class="card col-12">
                <div class="card-header">
                    <h5>Your Wallet</h5>
                </div>
                <div class="card-body">
                    <p>Your current balance is: ${{ walletamount }}</p>
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Deposit</button>
                    <button @click="SubscribedFunction">subscribe</button>
                </div>
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <input type="text" v-model="walletDepo.amount">
                                <button @click="deposit">Submit</button>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { wallet, walletDeposite,Subscribed } from "@/service/Service.js";

export default {
    name: 'wallet',
    data() {
        return {
            walletamount: null,
            walletDepo: {
                userId: this.$store.state.user.userId,
                amount: null,
                money:100
            }
        }
    },
    mounted() {
        console.log(this.userId);
        this.WalletFunction()
    },
    methods: {
        async WalletFunction() {
            try {
                const response = await wallet(this.walletDepo.userId);
                console.log(response);
                this.walletamount = response.wallet
            } catch (error) {
                console.log(error);

            }
        },
        async deposit() {
            try {
                const response = await walletDeposite(this.walletDepo);
                console.log(response);
                this.walletamount = response.wallet
                location.reload();
            } catch (error) {
                console.log(error);

            }
        },
        async SubscribedFunction() {
            try {
                const response = await Subscribed(this.walletDepo.userId,this.money);
                console.log(response);
                location.reload();
            } catch (error) {
                console.log(error);

            }
        },
    }
}
</script>

<style lang="scss" scoped></style>