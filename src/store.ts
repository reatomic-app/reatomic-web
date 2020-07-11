import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
});

/*
 * HOW TO ADD A NEW MODULE?
 * ========================
 *
 *   For example, in `plans/details/risk-análisys` you have to do this:
 *
 *   In `plans/details/risk-análisys/risk-analysis.store.ts`
 *
 *      import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
 *      import MainStore from "@/store";
 *
 *      @Module({ dynamic: true, name: 'plans:detail:risk-analysis', store })
 *      class FinantialAnalisys extends VuexModule {
 *        (...)
 *      }
 */
