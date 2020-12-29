import { Input } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import React from 'react'


function SearchBar() {

	const { Search } = Input;

	const suffix = (
	<AudioOutlined
		style={{
		  fontSize: 16,
		  color: '#1890ff',
		}}
	/>
	);

	const onSearch = value => console.log(value);

	return (
		<React.Fragment>
			<Search placeholder="Find Food..." onSearch={onSearch}  allowClear enterButton />
		</React.Fragment>
	)
}

export default SearchBar