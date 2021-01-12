import { Input } from 'antd';
import React from 'react'


function SearchBar() {

	const { Search } = Input;
	const onSearch = (value) => {
		console.log(value);
		
	}

	return (
		<React.Fragment>
			<Search placeholder="Find Food..." onSearch={onSearch}  allowClear enterButton />
		</React.Fragment>
	)
}

export default SearchBar