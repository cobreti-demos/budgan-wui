<template>
  <div class="account-list-panel">
    <ul>
      <li v-for="account in bankAccountsStore.accounts" :key="account.accountId">
        {{ account.accountId }} - {{ account.transactionsGroups.length }}
        <transactions-block class="transactions-block" :bank-account-transactions="account.transactionsGroups"></transactions-block>
      </li>
    </ul>
  </div>
</template>

<style scoped>
  .account-list-panel {
    position: relative;
    display: block;
    overflow: hidden;
    height: 100%;


    ul {
      position: relative;
      display: block;
      height: 100%;

      li {
        position: relative;
        display: block;
        height: 8em;
        max-height: 8em;
        //margin-bottom: 2em;

        .transactions-block {
          position: relative;
          display: block;
          //border: 1px solid red;
          height: 6em;
          max-height: 6em;
        }
      }
    }
  }

</style>

<script setup lang="ts">

import {useBankAccountsStore} from '@/stores/bankAccounts-store';
import TransactionsBlock from '@components/accounts/TransactionsBlock.vue';

const bankAccountsStore = useBankAccountsStore();

</script>