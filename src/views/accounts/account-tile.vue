<template>
  <v-card class="ma-10">
    <v-card-title class="cursor-pointer">
      <v-btn
        class="account-name"
        variant="plain"
        :to="{path: '/account/' + props.account.accountId}"
        >
        {{props.account.name}}
      </v-btn>
    </v-card-title>
    <v-card-text class="cursor-default ml-6">
      <div class="d-flex flex-row">
        <div class="info-span">
            {{props.account.accountId}}
        </div>
        <div class="info-span">{{props.account.accountType}}</div>
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped>

  .account-name {
    font-size: 1em;
    font-weight: bold;
  }

  .cursor-default {
    cursor: default;
  }

  .cursor-pointer {
    cursor: pointer;
  }

  .info-span {
    margin-right: 1em;
    width: 20em;
  }
</style>

<script setup lang="ts">

  import { type BankAccount } from '@models/BankAccountTypes'

  const props = defineProps<{
    account: BankAccount
  }>();


</script>
