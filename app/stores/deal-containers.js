import DealSontainersSource from 'sources/deal-containers';
import { datasource } from 'alt/utils/decorators';

@datasource(DealSontainersSource)
export default class DealContainersStore {

  constructor() {
    this.bindActions(this.alt.getActions('deals-items'));
    this.dealContainers = [];
    console.log(this);
    this.getInstance().perform();
  }

  onFetchSuccess(dealContainers) {
    this.dealContainers = dealContainers.reduce((results, curr) => {
      const index = results.findIndex(({ seed }) => seed === curr.seed);
      if (index > -1) {
        results[index] = curr;
        return results;
      } else {
        return [ curr, ...results ];
      }
    }, [ ...this.dealContainers ]);
  }

}
