import React, { Component } from 'react';
import moment from 'moment'
import Truncate from 'react-truncate'
import ReactGA from 'react-ga'
import Select from 'react-select'
import 'react-select/dist/react-select.css'


const DEFAULT_HPP = '12'

const PATH_BASE = 'https://jamja.vn/api/v3'
const PATH_SEARCH = '/searchdeal'
const PARAM_SEARCH = 'keyword='
const PARAM_OFFSET = 'offset='
const PARAM_HPP = 'limit='

const BRANDS = [
  {value: "59df09c376ec5703e6f51b2d", label: "T2 Tea For Life"},
  {value: "5976045776ec575d9edb24ea", label: "Hăo Chá"},
  {value: "599674d676ec57529124c542", label: "Sarahaki"},
  {value: "558bc34914db6b4f005bf559", label: "Dunkin' Donuts"},
  {value: "58f0a8b776ec5768bd4b6b5e", label: "Mugong Tea"},
  {value: "59279fc076ec57043341d3cd", label: "Taster's Choice"},
  {value: "55f62d5ff3c0627742796b9f", label: "TocoToco"},
  {value: "582412d16e0b497564b714f8", label: "Goky Tea"},
  {value: "5906fe3a76ec5710ee3fdf5e", label: "KoiCha "},
  {value: "59f2aa5f76ec5739b5a99458", label: "Royaltea Group"},
  {value: "5a0d7b0476ec5764f2f8325f", label: "Ten Ren"},
  {value: "59bbd1db76ec57125bf8e3d3", label: "Trà sữa XU - Tea and More"},
  {value: "59e300e176ec573afd0bea3f", label: "ShanCha Việt Nam"},
  {value: "59eb40aa76ec576a300daef9", label: "Taste Tea"},
  {value: "592adde976ec573c02212d51", label: "MAKU"},
  {value: "57e8a13e6e0b494e8a24326a", label: "R&B Tea"},
  {value: "59a6634076ec572eef4d3355", label: "Royaltea Flagship"},
  {value: "564ae211fda8b93fb0b6d531", label: "Feeling Tea"},
  {value: "5961d4b176ec571959954509", label: "Hefkcha"},
  {value: "5993105f76ec570ccc5fb42d", label: "LeeTee"},
  {value: "5a05bc7076ec576d19db8105", label: "KOL Tea"},
  {value: "591805e376ec5768734c44da", label: "SayTea"},
  {value: "58cce32e76ec571a75ab9910", label: "Uncle Tea"},
  {value: "59bf4b8776ec5777c6f6f207", label: "OneZo"},
  {value: "59fdcdd076ec5714d0967671", label: "Koreto Coffee"},
  {value: "58dc848f76ec576691dd4c52", label: "House of Cha"},
  {value: "5994325b76ec570ccc620d86", label: "Shankao - Taiwan Lattea"},
  {value: "598de00276ec577b9ed40adf", label: "Heytea"},
  {value: "57349ddf6e0b4910cfa2ae02", label: "Bobapop"},
  {value: "5a013c1f76ec5722b2c7680f", label: "Tea Box"},
  {value: "59166b3276ec5724de54377c", label: "KAMU TEA - KAFE"},
  {value: "596d6edc76ec575e74eae672", label: "COMEBUY"},
  {value: "594dd02c76ec574f408ef418", label: "Master Tea"},
  {value: "59c100e876ec5778396ba790", label: "SevenTea"},
  {value: "5869bf5b76ec574c778e6507", label: "Royaltea Việt Nam"},
  {value: "594f2cca76ec57236d20ce8f", label: "Tea Zone"},
  {value: "598ebebd76ec577c9a668dee", label: "WANNA TEA"},
  {value: "5963393476ec5774a1cf461e", label: "King Tea Vietnam"},
  {value: "5a05205176ec576d17dc1886", label: "Heytea VN"},
  {value: "59954ca676ec577b1aa1c57f", label: "HEBES Tea House and Café"},
  {value: "594a1db576ec571515ea1853", label: "KaiTea"},
  {value: "59492b3a76ec571518eb4b0c", label: "Xinshiqi"},
  {value: "5972fe1976ec57436e349f63", label: "DREAM TEA"},
  {value: "59fd8b3976ec5714c7961f16", label: "Heicha"},
  {value: "58d72d0276ec573c3d4d5307", label: "Camellia Tea"},
  {value: "592ee93076ec5720d492dadb", label: "Teastory Vietnam"},
  {value: "598fef8376ec57071bb397b5", label: "NesNo Vietnam"},
  {value: "5768b5ba6e0b490983180d65", label: "KOI Thé Café"},
  {value: "5705ecd66e0b491b68a02a89", label: "Chachago "},
  {value: "59a02de876ec575268bf25c1", label: "Chamichi Vietnam"},
  {value: "57e8a3826e0b494e8a2434a2", label: "KungFu Tea"},
  {value: "59f6eecd76ec571353322798", label: "Royaltea"},
  {value: "5742f2156e0b4906d3d3cf23", label: "Gong Cha"},
  {value: "5a166e3976ec574e1fa35082", label: "O'Cha Milk Tea & Coffee"},
  {value: "5906251e76ec5710f24583e8", label: "Heekcaa"},
  {value: "59d068a376ec5713f9f10c26", label: "Ice Kitchen"},
  {value: "5a06caf976ec57280c9c3ad9", label: "Finncha Việt Nam"},
  {value: "59609c5a76ec5719569378d4", label: "THE BLACK TEA"},
  {value: "59bcd2a576ec5722cdb991e4", label: "Heekcaa By Heytea"},
  {value: "59c1e34876ec57783a6c08b2", label: "RoyalTea HongKong"},
  {value: "59ba3fc876ec5706b8c77b80", label: "CUEICHA"},
  {value: "591d90d276ec572cd86e9af0", label: "Feng Cha"},
  {value: "58a9b87d76ec577da3e35697", label: "Wang Tea"},
  {value: "5a052fa576ec576d1cdc61f4", label: "Mochio Tea"},
  {value: "5971e23976ec57436b335f83", label: "Sharetea"},
  {value: "59acee2a76ec57636f0a5f26", label: "Royaltea MainGroup"},
  {value: "59899eb476ec5726b0f206e0", label: "Auntie KIM"},
  {value: "577f21b76e0b4962bb0e2f2c", label: " LaViDa Coffee and Milk Tea"},
  {value: "57660a9a6e0b497e0ea4bf5b", label: "Trà Tiên Hưởng"},
  {value: "564aff07fda8b93fb0b6e00e", label: "King Taiyaki"},
]

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      data: [],
      isLoading: false,
      nextHref: null,
      city: { value: 'ha-noi', label: 'Hà Nội' },
      brand: '',
    }

    this.fetchData = this.fetchData.bind(this)
    this.setData = this.setData.bind(this)
    this.fetchNext = this.fetchNext.bind(this)
    this.setCity = this.setCity.bind(this)
    this.setBrand = this.setBrand.bind(this)
    this.fetchByBrand = this.fetchByBrand.bind(this)
    this.setBrandData = this.setBrandData.bind(this)
    ReactGA.initialize('UA-110174517-1');
    ReactGA.pageview(window.location.pathname + window.location.search)
  }

  setData (result) {
    const { nextHref } = this.state
    const { objects, meta } = result
    const oldDeals = nextHref ? this.state.data : []
    const updatedDeals = [...oldDeals, ...objects]
    this.setState({ data: updatedDeals, nextHref: meta.next, isLoading: false })
  }

  setBrandData (result) {
    const { objects, meta } = result
    this.setState({ data: objects, nextHref: meta.next })
  }

  fetchData (city) {
    fetch(`${PATH_BASE}${PATH_SEARCH}/?${PARAM_SEARCH}tra%20sua&province=${city}&${PARAM_OFFSET}0&${PARAM_HPP}${DEFAULT_HPP}`, {timeout: 500})
     .then(response => response.json())
     .then(result => this.setData(result))
     .catch(e => console.log(e))
  }

  fetchByBrand (id) {
    fetch(`${PATH_BASE}${PATH_SEARCH}/?deal_state=selling&brand_id=${id}&${PARAM_OFFSET}0&${PARAM_HPP}${DEFAULT_HPP}`, {timeout: 500})
     .then(response => response.json())
     .then(result => this.setBrandData(result))
     .catch(e => console.log(e))
  }

  fetchNext (nextHref) {
    this.setState({isLoading: true})
    fetch(`https://jamja.vn/${nextHref}`, {timeout: 500})
      .then(response => response.json())
      .then(result => this.setData(result))
      .catch(e => console.log(e))
  }

  componentDidMount () {
    this.fetchData(this.state.city.value)
  }

  setCity (city) {
    if (city) {
      this.setState({ city: city, nextHref: null, brand: '' })
    } else {
      this.setState({ city: { value: 'ha-noi', label: 'Hà Nội' }, nextHref: null, brand: '' })
    }
  }

  setBrand (brand) {
    this.setState({ brand, nextHref: null, city: {} })
  }

  componentWillUpdate (nextProps, nextState) {
    if (this.state.city !== nextState.city) {
      this.setState({ data: [] })
      this.fetchData(nextState.city.value)
    }
    if (this.state.brand !== nextState.brand) {
      this.setState({ data: [] })
      this.fetchByBrand(nextState.brand.value)
    }
  }

  render() {
    const { data, isLoading, nextHref } = this.state
    const list = (data) || []
    return (
      <div>
        <div className="container">
          
            <div className="hero-body">
              <div className="container">
                <h1 className="title is-2">
                  Trà sữa giá hời
                </h1>
                <h2 className="subtitle">
                  Tìm các khuyến mãi giảm giá khi mua trà sữa ở thành phố Hà Nội
                </h2>
                <div className="columns">
                  <div className="column is-10">
                    <form action="">
                      <div className="field is-horizontal">
                        <div className="field-body">
                          <div className="field">
                            <div className="control is-expanded">
                              <Select
                                required={true}
                                placeholder="Thành phố"
                                searchable={false}
                                name="city-field"
                                value={this.state.city.value}
                                onChange={this.setCity}
                                options={[
                                  { value: 'ha-noi', label: 'Hà Nội' },
                                  { value: 'tp-hcm', label: 'Hồ Chí Minh' },
                                ]}
                              />
                            </div>
                          </div>
                          <div className="field">
                            <div className="control is-expanded">
                              <Select
                                placeholder="Thương hiệu"
                                name="brand-field"
                                value={this.state.brand.value}
                                onChange={this.setBrand}
                                options={BRANDS}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          <div className="section">
            {
              list.length
                ? <DealList list={list} />
                : <NotFound />
            }
            {
              nextHref
                ? <LoadMore nextHref={nextHref} onClickNext={() => this.fetchNext(nextHref)} isLoading={isLoading} />
                : null
            }
          </div>
        </div>
      </div>
    );
  }
}


const NotFound = () => 
  <div className="has-text-centered">
    <h1 className='title'>
      Hiện tại chúng tôi không tìm thấy khuyến mãi bạn đang cần.
    </h1>
  </div>


const LoadMore = ({nextHref, onClickNext, isLoading}) =>
<div className='container has-text-centered'>
    <div className='columns'>
      <div className='column is-2-desktop is-offset-5-desktop is-8-mobile is-offset-2-mobile'>
        <a
          className={'button ' + (!nextHref ? ' is-disabled' : ' is-focused' + (isLoading ? ' is-loading' : ''))}
          onClick={onClickNext}
        >
        Xem thêm
      </a>
      </div>
    </div>
  </div>


const DealList = ({list}) => (
    <div className="columns is-mobile is-multiline">
      {
        list.map(deal =>
          <DealCard obj={deal} key={deal.id} />
        )
      }
    </div>
)


const DealCard = ({obj}) =>
    <div className="column is-4-desktop is-12-tablet is-12-mobile" style={{paddingTop: '20px'}}>
      <div className="card bm--card-equal-height">
        <div className="card-image">
          <figure className="image is-16by9">
            <img src={obj.images[0].link} alt="" />
          </figure>
        </div>
        <div className="card-content">
          <div className="media">
            <div className="media-left">
              <figure className="image is-48x48">
                <img src={obj.brand.image} alt=""/>
              </figure>
            </div>
            <div className="media-content">
              <p className="title is-5" style={{marginBottom: 0}}>{obj.brand.brand_name}</p>
              <p className="tag is-rounded is-warning">{obj.highlight}</p>
              {/* <p className="subtitle is-5"><Truncate lines={1}>{obj.brand.brand_desc}</Truncate></p> */}
            </div>
          </div>
          <div className="content">
            <h5>{obj.title}</h5>
            <Truncate lines={4}>
              {obj.condition.split('\n').map((item, i) =>
                <p key={i}>
                  {item}
                </p>)
              }
            </Truncate>
            <br/>
            <br/>
            <small><em>Từ ngày {moment(obj.start_sale_time).format('DD-MM-YYYY')} đến {moment(obj.end_sale_time).format('DD-MM-YYYY')}</em></small>
          </div>
        </div>
        <footer className="card-footer">
          <a href={obj.deal_url} target="_blank" className="card-footer-item button is-primary is-outlined">Chi tiết</a>
        </footer>
      </div>
    </div>


export default App;
