import { Input } from 'antd';
import React from 'react'


function SearchBar(props) {

	const { Search } = Input;

	return (
		<React.Fragment>
			<Search placeholder="Find Food..." value={props.searchWord} onChange={(e) => {props.setSearchWord(e.target.value)}}  allowClear enterButton />
		</React.Fragment>
	)
}

export default SearchBar