
import React from 'react';
import { TextareaItem } from 'antd-mobile';

class SearchArea extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.onSearchDonate = this.onSearchDonate.bind(this);
  }

  onSearchDonate() {
    console.log(this.refs.search.state.value);
  }

  render() {
    return (
      <div style={styles.searchArea}>
        <span style={{...styles.searchTitle, ...styles.textOverflow}}>捐款查询平台</span>
        <div style={styles.inputBox}>
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAxBAMAAABucDcRAAADI2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS41LWMwMTQgNzkuMTUxNDgxLCAyMDEzLzAzLzEzLTEyOjA5OjE1ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6N0YwRjdGRDU5Mzg3MTFFNjhCRUFBMDNBOEQwNTY0RjQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6N0YwRjdGRDY5Mzg3MTFFNjhCRUFBMDNBOEQwNTY0RjQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3RjBGN0ZEMzkzODcxMUU2OEJFQUEwM0E4RDA1NjRGNCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3RjBGN0ZENDkzODcxMUU2OEJFQUEwM0E4RDA1NjRGNCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Ps529v8AAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAAAJFBMVEWZmZlHcEyZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZk2EEruAAAADHRSTlP/AFcI3BnwOHCli7pJ4CL/AAABc0lEQVQ4y3WTv0vDUBDHv5QQWzu9JjFaF7N076AgLkEU/DEVRXALFbE6tVtxqiB2jSiCWwXRtaB/oC/vXfPe2Zcb8uM++d67u9xBaBu/Zv7xVBiDukafUHbS4yCagazRY6CD0vo2aEvH7fRse/wmH14MCObAfrd4CR6BZrcEm8CAPguegJ8SzOCNFpHjFI0FaAGHJv1zICFwAc9kL6IU1wRmuLEKFkOKhQh4sME6oAKgDc/2iyDFhwIhagyICa4UGOq7sR2sKDDBMwcbWFUg52cXpzcVSDHiINbZIEOPgwi+AkCXg0B7qkFlqMrDK9OtLHCpJWvUkhB1DkJqomw7zzc+SJw/ygxczn+tAXwYLMDH5/I9KQcu5wNXK8EeUKfEArkPfmIP9VE51CBJsQa79hrMSfJ/cQYtkuhVy61V29ISWs4v7b+TFZEElM79b4bTb5WClmC5Zi1xAC1xASVxASVxgkLiBFLiuUELvhuITr8CCPEHD9RqP0qeKH0AAAAASUVORK5CYII="
            alt=""
            style={styles.searchButton}
            onClick={this.onSearchDonate}
          />
          <TextareaItem
            placeholder="单位查询直接输入名称，个人查询请输入姓名+手机号后四位，如韩星0000"
            data-seed="logId"
            autoHeight
            ref="search"
            style={{paddingRight: '1rem'}}
          />
        </div>
      </div>
    );
  }

}

export default SearchArea;

const styles = {
  textOverflow: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  },
  searchArea: {
    display: 'flex',
    marginTop: '2.5rem',
    height: '18rem',
    padding: '4rem',
    backgroundColor: '#ffffff'
  },
  searchTitle: {
    width: '32rem',
    height: '10rem',
    paddingTop: '1rem',
    lineHeight: '8rem',
    fontSize: '5.2rem',
    color: '#333333'
  },
  inputBox: {
    flex: 1,
    height: '10rem',
    marginLeft: '4rem',
    border: '1px solid #999999',
    borderRadius: '5rem',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  searchButton: {
    width: '5rem',
    height: '5rem',
    marginLeft: '4rem'
  }
};
