/*
    ./client/components/App.jsx
 */
import React from 'react';
import axios from 'axios';
import InputBox from '../components/InputBox';
import TrumpHead from '../components/TrumpHead';
import TweetDisplay from '../components/TweetDisplay';
import Navigation from '../components/Navigation';
import About from '../components/About';
import Favicon from 'react-favicon';

const favicon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAC4jAAAuIwF4pT92AAAJfWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAxNy0xMS0wOFQyMToxOToxNC0wODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxNy0xMS0wOFQyMjowMjo1NC0wODowMCIgeG1wOk1vZGlmeURhdGU9IjIwMTctMTEtMDhUMjI6MDI6NTQtMDg6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOmNjNzc2NDc5LTExODctNGNjZC04ZjdjLWM2YWZlOWI5YzJhYSIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOmZjZWE2NDBhLTU3NGQtZmM0Ni04ZmYwLTcwMGZjNzlkMjNjMSIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjZkNWE3YzA0LTNjY2EtNDMxMy05MzYwLWQ1YTdjOTk1MzUwZSIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo2ZDVhN2MwNC0zY2NhLTQzMTMtOTM2MC1kNWE3Yzk5NTM1MGUiIHN0RXZ0OndoZW49IjIwMTctMTEtMDhUMjE6MTk6MTQtMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAoTWFjaW50b3NoKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6M2FjMGY0M2UtOWVlMC00NzQwLWJmOWYtMmNjNzk2Nzg3OTYwIiBzdEV2dDp3aGVuPSIyMDE3LTExLTA4VDIxOjIwOjA4LTA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgKE1hY2ludG9zaCkiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNvbnZlcnRlZCIgc3RFdnQ6cGFyYW1ldGVycz0iZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iZGVyaXZlZCIgc3RFdnQ6cGFyYW1ldGVycz0iY29udmVydGVkIGZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9wbmciLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjhlYmEyNGVkLTlkNzYtNGUwZC1hMGIzLWVjOWRmMDkxNTcyMCIgc3RFdnQ6d2hlbj0iMjAxNy0xMS0wOFQyMToyMDowOC0wODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpjYzc3NjQ3OS0xMTg3LTRjY2QtOGY3Yy1jNmFmZTliOWMyYWEiIHN0RXZ0OndoZW49IjIwMTctMTEtMDhUMjI6MDI6NTQtMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6M2FjMGY0M2UtOWVlMC00NzQwLWJmOWYtMmNjNzk2Nzg3OTYwIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjZkNWE3YzA0LTNjY2EtNDMxMy05MzYwLWQ1YTdjOTk1MzUwZSIgc3RSZWY6b3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjZkNWE3YzA0LTNjY2EtNDMxMy05MzYwLWQ1YTdjOTk1MzUwZSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Phq09hMAAAYUSURBVHja7Z17iBZVFMDNx1aLtGtumtKihNYm9hZJV80HhZBJoFLkW/FVQouh+ADRTVhELVfdUItEt9XwhWjspvjECCoiH4Vm1moPH5ViWHit1a9z/M5Hs+s3883j3pl7Z84fv7/2m8fe38zcufeec6ZZKpVqxugDNwILYVgIC2FYCAthWAgLYUIXIqqKk04+0AOYBJQDy4C3gQqgDBgEtAvrfJIsYjBQCXwN/AWkHPge2AiMAQoVnEteUoXcBcwETuQQ4MQlYAVQIuF8SuiOvC+JQiYC9QFEZGMpSfZ6LvgInE/72Ov2kdUReD4GItoAWyWLsHIaeNbluXSjO+JPy/bFboW8RRs8arCMx4GfFMqwUuZwYU8APsmyTbWXTv0X2uh34H4DZZQC/4YkI8NsemvrB8wF9gHC5rc3gLZuhbyY5bZsbZCMhyKQkbJcwG5+N8HLa+/GLDs4ZogUvEJ/jUiGW7Z6GYe0dLD8LXCv5kJ2aS7jM68Dw6dz7PAUdVQ6yhiquYwvgFY25/46MDnbH8a72PFvwFOaybgDuKCxjBqbi38BjY+wk++W7R+b7/IA2GkO02zgp6OIUzRPhuf4ADAKWE2Pf+vvnrB7ZL3j8YALNRFyUlMhh4GqHOc32qkPWeXjoLVA+whlPKl53+HEglydemWA9+/hEQkpN1RGlZu3rEUBD7Iu2whUMQcMlPG+29fe6RIOhlPU00KScTfwh2EyVnoZhwySeODPQ5gxLjG5z3Aj5B6HCTG/4ExnX0VC+hoi4ob1bcrrEu5+RSf1MU1cyhTyggEycIXysSBr6q8pPsGvqK8qkiBkiAFCKoMGOeBCfkMIJ4orZ+vprsn3KaS/AUI+lBF1sjbkk8Z5qI9onaCrByHdDRCySYaQDhH+AzcpPGcNMBXolWMmQPf1jxpZcVlzNPqnrtKEXC2JwtH5FJpyP665kA9kBsodNXieSPuBoB8huBh1jRs1EBV+hbSw+WFvbtRAvOFXCMaYvguMsxkRX+fG9cWIII+s05Yok3mZlSwCo07quIE90y+IkE020d+baXQ9VfO1a91ooKVb30IqXK6nc2O74ywFYPgWMpobUfpMd6CEnc7ciFJZIiOD6hg3pDRekSFkDjekNB6UIaQdN6QUvpOZ9LmOGzQw78kU0p4bNDDDZQpBZnCj+gYDRQpU5Kkf4sb1xU4/S9JufoRhQee5gT0zSpUQpEuTVF4m9+OqtUohyMPAz9zYcoMagghBsATEHm7wnJSGJSTDLOAfbnjbxNhIqgF1odSsBpbQiDFRCclQRBmkO2khK8l3DqZFNA9TSE/Kvi2k9F7rwgvWRMH6KJc5mCE8IWWWhBxM5f1BpGui/M2Pqltt0jxsIXkceWLLJBnpFX42msuNfxv1svJd/NYHvMwSGvFclEKQYSyhUVaYFlVJt7OMW3mDRboIaUVvWUkWMll2EmvQHXRI8NR8nYqsYhk76QScSZiMq7ROpG1l60KRvepmXBmoKOdeeiHleQmYy5qtSoYKIZlZ4A0xlVGjUoYqIdYqzost+Samc1i1DNVCmhY1fpMS6A8C24T7+ra6RCDmxUlIUzDF66IhMs4Iy9cL4iakjWEhqvUi5NKFYcoYa9BdgXwje1pEFyGYvWtaCT4sT5UfxeNc5c77GDoBWR1Rv6pECH5t5mWDY7dmRSlDlpA7Rbqu4irx/zdHTOOc0ORrQpmvIXjZqC31CzNoPHHO8AHfZhF+WVtHIaUU8IZl6KZR1PZIkS4kNp3W0LHg7w7gCHAlRlEi43URYRWCz/1xCVtsWq3TXeHUh7wq9C8GFgR82XhGRxG5OnV8XJ2IkYhDwpBPALqZc9pvsAj81tNgE0R4fe3FIpRrqCPUXcKPIl1A5xGTRPgdhxTQW9gWzYLlzlJOONb/bWGiCBkDwwJqgOXAlyJd2jXMIAPsF8ppfbulyRJUTZ1g9MlLIl39fwu9rQX9jMR1uvo/FenvbeBgdEAUs7Bxme3FaJQSuorHkqy1JAy/N7ibQjG30TrJYhqMYi1e/Oh8sbD/zFw8haRSKUYjuBFYCMNCWAjDQlgIw0JYCBM2/wEQlR+arVXjMwAAAABJRU5ErkJggg==';


export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {input: "", trumped: "", mode: "input", about: false};

    this.url = process.env.NODE_ENV === 'production' ? 'http://165.227.22.2/api/trumpthat' : 'http://localhost:3001/api/trumpthat';

    this.url = 'http://165.227.22.2/api/trumpthat';

    this.trumpify = this.trumpify.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.resetDisplay = this.resetDisplay.bind(this);
    this.toggleAbout = this.toggleAbout.bind(this);
    this.shareTweet = this.shareTweet.bind(this);
    this.getWindowOptions = this.getWindowOptions.bind(this);
  }

  trumpify() {
    if (this.state.input.trim().length === 0) return;

    axios.post(this.url, {
      phrase: this.state.input
    })
      .then((res) => {
        console.log(res.data.message);
        if (res.data.message.trim().length !== 0)
          this.setState({trumped: res.data.message, mode: "display", about: false});
      })
      .catch((err) => {
        console.error(err);
      })
  }

  handleInputChange(e) {
    this.setState({ input: e.target.value });
  }

  resetDisplay() {
    this.setState({mode: "input", trumped: "", input: ""});
  }

  toggleAbout() {
    let ab = !this.state.about;
    this.setState({about: ab});
    console.log(this.state.about, "about");
  }

  getWindowOptions() {
    var width = 500;
    var height = 350;
    var left = (window.innerWidth / 2) - (width / 2);
    var top = (window.innerHeight / 2) - (height / 2);

    return [
      'resizable,scrollbars,status',
      'height=' + height,
      'width=' + width,
      'left=' + left,
      'top=' + top,
    ].join();
  }

  shareTweet() {
    let text = encodeURIComponent(this.state.trumped);
    let shareUrl = 'https://twitter.com/intent/tweet?url=' + 'www.trumpthattweet.com' + '&text=' + text;
    let win = window.open(shareUrl, 'ShareOnTwitter', this.getWindowOptions());
    win.opener = null; // 2
  }

  render() {
    const mode = this.state.mode;
    const about = this.state.about;
    let display = null;
    let aboutModal = null;

    if (mode === 'input') {
      display = <InputBox
                  trumpify={this.trumpify}
                  input={this.state.input}
                  handleChange={this.handleInputChange}
                  mode={this.state.mode}/>;
    } else {
      display = <TweetDisplay
                  tweet={this.state.trumped}
                  mode={this.state.mode}
                  reset={this.resetDisplay}
                  shareTweet={this.shareTweet}/>;
    }

     aboutModal = about ? <About about={this.toggleAbout}/> : null;

    return (
      <div style={{textAlign: 'center'}}>
        <h1>TRUMP THAT TWEET</h1>
        <Favicon url={favicon} />
        {aboutModal}
        <Navigation about={this.toggleAbout}/>
        <TrumpHead mode={this.state.mode}/>
        {display}
      </div>
    )
  }
}