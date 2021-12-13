import React, { Component } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import dateFormat from 'dateformat';
import moment from 'moment';
import {
	MuiPickersUtilsProvider,
	KeyboardTimePicker,
	KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, Select } from 'antd';
export default class Labelbox extends Component {
	constructor(props) {
		super(props);
		console.log("valid date", props.value)
		this.state = { upload_model: false, gender: 'M', open: false, value: null, selectedtime: props.value, selecteddate: props.value ? props.value : null };
		// ? props.value : new Date()
	}
	changeGender = (data) => {
		this.setState({ gender: data });
		this.props.changeGender && this.props.changeGender(data);
	}
	datepickerChange = (date) => {
		if (date == "Invalid Date") {
			this.props.invalidate && this.props.invalidate(date);
		} else {
			var datefmt = dateFormat(date, 'yyyy-mm-dd');
			this.props.changeData && this.props.changeData(datefmt);
		}

	}
	timepickerChange = (time) => {
		console.log("time", time);
		var timeformat = dateFormat(time, "hh:MM:ss");
		console.log("timeformat", timeformat)
		this.setState({ selectedtime: time });
		this.props.changeData && this.props.changeData(time);
	};

	componentWillReceiveProps(props) {

		if (props.type == "datepicker") {
			if (isNaN(new Date(props.value).getTime())) {

			}
			else {
				var datefmt = dateFormat(props.value && props.value, 'yyyy-mm-dd');
				// this.setState({ selecteddate: datefmt })
			}
		}
		if (props.gendervalue) {
			this.setState({ gender: props.gendervalue });
		}
	}
	onChange = (time) => {
		this.setState({ value: time });
		this.props.changeData && this.props.changeData(time)
	};
	handleSearch = value => {
		if (value) {
			fetch(value, data => this.setState({ data }));
		} else {
			this.setState({ data: [] });
		}
	};

	renderinput = (data) => {
		if (data.type == 'text') {
			return (
				<div className="formdiv inputlabel">
					<label className="labeltxt">{data.labelname}</label>
					<div>
						<input className={`${data.error && "brdred"} brdrcls inputID`} value={this.props.value} maxLength={this.props.maxlength} type="text"
							onChange={(e) => this.props.changeData && this.props.changeData(e.target.value)}
							onBlur={(e) => this.props.SubmitData && this.props.SubmitData(e.target.value)}
							placeholder={this.props.placeholder} disabled={this.props.disabled} hidden={this.props.hidden} 
							required={this.props.required&&true}
							/>
						{
							<div className="Errormsg">
								<div>{data.error && data.errmsg}</div>
							</div>
						}
					</div>
				</div>

			)
		} if (data.type == 'email') {
			return (
				<div className="formdiv inputlabel">
					<label className="labeltxt">{data.labelname}</label>
					<div>
						<input className={`${data.error && "brdred"} brdrcls inputID`} value={this.props.value} maxLength={this.props.maxlength} type="email"
							onChange={(e) => this.props.changeData && this.props.changeData(e.target.value)}
							onBlur={(e) => this.props.SubmitData && this.props.SubmitData(e.target.value)}
							placeholder={this.props.placeholder} disabled={this.props.disabled} hidden={this.props.hidden} 
							required={this.props.required&&true}
							readonly={this.props.readOnly}
							/>
						{
							<div className="Errormsg">
								<div>{data.error && data.errmsg}</div>
							</div>
						}
					</div>
				</div>

			)
		}else if (data.type == 'number') {
			return (
				<div className="formdiv">
					<label className="labeltxt">{data.labelname}</label>
					<div>
						<input className={`${data.error && "brdred"} brdrcls inputID`} min="0" value={this.props.value} type="number" maxlength={this.props.maxlength} placeholder={this.props.placeholder} onChange={(e) => this.props.changeData && this.props.changeData(e.target.value)} onKeyDown={e => (e.key === "e" || e.key === "+" || e.key === "-") && e.preventDefault()} disabled={this.props.disabled} />
						{
							<div className="Errormsg">
								<div>{data.error && data.errmsg}</div>
							</div>
						}
					</div>

				</div>

			)
		} else if (data.type == 'textarea') {
			return (
				<div className="formdiv">
					<label className="labeltxt">{data.labelname}</label>
					<div>
						<textarea className={`${data.error && "brdred"} brdrcls`} rows={this.props.rows} cols="50" value={this.props.value} placeholder={this.props.placeholder} onChange={(e) => this.props.changeData && this.props.changeData(e.target.value)} disabled={this.props.disabled}></textarea>
						{
							<div className="Errormsg">
								<div>{data.error && data.errmsg}</div>
							</div>
						}
					</div>

				</div>

			)
		} else if (data.type == 'radio') {
			// console.log(this.props.checked,"checked")
			return (
				<div className="formdiv">
					<label className="labeltxt">{data.labelname}</label>
					<div>
						<FormControlLabel control={<Radio className="radiobtncolor" icon={<RadioButtonUncheckedIcon fontSize="small" />}
							checkedIcon={<RadioButtonCheckedIcon fontSize="small" />} onClick={(e) => this.changeGender(e.target.value)} checked={this.props.checked} fontSize="small" />} label={this.props.label} />
						
					</div>

				</div>
			)
		} else if (data.type == 'datepicker') {
			function onChange(date, dateString) {
				console.log(date, dateString);

			}

			const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

			return (
				<div className="formdiv">
					<label className="labeltxt">{data.labelname}</label>
					<div className={`${data.error && "brdred"} brdrcls inputID`}>
						{/* <DatePicker value={moment(this.props.value)?moment(this.props.value):new Date()} open={this.state.open}  onFocus={()=>this.setState({open:true})} onChange={(date)=>this.datepickerChange(date)}  className="datepickerchnge" style={{width:'100%',}} format="YYYY-MM-DD"  /> */}
						<MuiPickersUtilsProvider utils={DateFnsUtils} >
							<KeyboardDatePicker
								placeholder={this.props.placeholder}
								disableToolbar={this.props.disableToolbar && this.props.disableToolbar}
								autoOk={true}
								disabled={this.props.disabled}
								views={this.props.view && this.props.view}
								clearable={false}
								disableUnderline={true}
								disableFuture={this.props.disableFuture ? this.props.disableFuture : false}
								disablePast={this.props.disablePast && this.props.disablePast}
								minDate={this.props.minDate && this.props.minDate}
								maxDate={this.props.maxDate && this.props.maxDate}
								format={this.props.format === "MMM-yyyy" ? "MMM-yyyy" : "dd-MM-yyyy"}
								margin="normal"
								id="date-picker-inline"
								type="datepicker"
								// value={this.state.selecteddate}
								// InputProps={{ readOnly: true }}
						
							
								InputProps={{
									disableUnderline: true
								  }}
								value={this.props.value === "" ? null : this.props.value}
								onChange={(date) => this.datepickerChange(date)}

							/>
						</MuiPickersUtilsProvider>

						{
							<div className="Errormsg">
								<div>{data.error && data.errmsg}</div>
							</div>
						}
					</div>

				</div>
			)
		} else if (data.type == 'timepicker') {
			function onChange(date, dateString) {
				console.log(date, dateString);

			}

			console.log(this.props.value, "this.props.value")

			const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

			return (
				<div className="formdiv">
					<label className="labeltxt">{data.labelname}</label>
					<div className={`${data.error && "brdred"} brdrcls inputID`}>

						{/*<TimePicker value={this.props.value} onChange={(time)=>this.onChange(time)} />*/}
						<MuiPickersUtilsProvider utils={DateFnsUtils} >
							<KeyboardTimePicker
								margin="normal"
								// inputVariant="outlined"
								id="time-picker"
								value={this.props.value || new Date()}
								onChange={(time) => this.timepickerChange(time)}
								KeyboardButtonProps={{
									'aria-label': 'change time',
								}}
								minTime={this.props.minTime && this.props.minTime}
								maxTime={this.props.maxTime && this.props.maxTime}
								InputProps={{ readOnly: true }}
								
							/>
						</MuiPickersUtilsProvider>
						{
							<div className="Errormsg">
								<div>{data.error && data.errmsg}</div>
							</div>
						}
					</div>

				</div>
			)
		}
		else if (data.type == 'select') {
			function onChange(value) {
				console.log(`selected ${value}`);
			}
			const { Option } = Select;
			function onBlur() {
				console.log('blur');
			}

			function onFocus() {
				console.log('focus');
			}

			function onSearch(val) {
				console.log('search:', val);
			}

			console.log(data.value, "data.value");

			var optionValue = null

			data.dropdown && data.dropdown.map((value) => {
				if (value.value === data.value) {
					optionValue = value.value
				}
			})

			let selectValue = []

			if (data.value && this.props.mode === "multiple") {
				selectValue = data.value
			} else if (this.props.mode === "multiple" && data.value === "") {
				selectValue = []
			} else {
				selectValue = optionValue
			}

			return (
				<div className="formdiv">
					<label className="labeltxt">{data.labelname}</label>

					<Select disabled={this.props.disabled && true}
						className={`${data.error && "selectbrdred brdnone"} ${this.props.mode !== "multiple" && "selectAdjustHeight"} selectbox`}
						showSearch
						mode={this.props.mode ? this.props.mode : false}
						value={selectValue ? selectValue : this.props.placeholder}
						
						placeholder={this.props.placeholder}
						optionFilterProp="label"
						filterOption={(input, option) =>
							option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
						}
						onChange={(value) => this.props.changeData && this.props.changeData(value)}
						onSearch={(value) => this.props.searchData && this.props.searchData(value)}
						onBlur={() => this.props.blurData && this.props.blurData()}>
						{data.dropdown && data.dropdown.length > 0 ? data.dropdown.map((item, index) => {
							if (item.value) {
								if (this.props.mode === "multiple") {
									return (<Option key={index} disabled={item.disable} value={item.value}>{item.value}</Option>)
								}
								else {
									return (<Option key={index} disabled={item.disable} value={item.value}>{item.value}</Option>)
								}
							}
						})
							: null
						}


					</Select>{
						<div className="Errormsg">
							<div>{data.error && data.errmsg}</div>
						</div>
					}


				</div>
			)
		} 
	}
	render() {

		const labelcss = require('./labelbox.css');
		return (
			<div className="custom_labelbox">
				{this.renderinput(this.props)}
			</div>
		);
	}
}