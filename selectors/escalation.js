import { createSelector } from 'reselect';

const getAllRules = state => state.escalation.allRules;

export const getRuleNew = createSelector(
  [getAllRules],
  allRules => allRules.find(el => el.alertStatus === 'new')
)

export const getRuleInHand = createSelector(
  [getAllRules],
  allRules => allRules.find(el => el.alertStatus === 'inHand')
)
