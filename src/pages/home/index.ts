export class
INDEX
{

  array =  ['string', 'google', 'bank', 'like']
  update(event) {

    let q = event.target.value
    let filterd = []
      let teams = this.array.filter(t => (t).includes(q));
      if (teams.length) {
        filterd.push(teams)
      }
  }
}
