export default nft => {
  delete nft['editionNonce']
  delete nft['json']
  delete nft['jsonLoaded']
  delete nft['uses']
}
