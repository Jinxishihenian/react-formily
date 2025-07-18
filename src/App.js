import './App.css';
import Form1 from "./components/form1";
import Form2 from "./components/form2";
import Form3 from "./components/form3";
import Form4 from "./components/form4";
import FormCSZ from "./components/form_csz";
import FormSelectInput from "./components/form_select_input";
// import FormCSZFilter from "./components/form_csz_filter";

function App() {
    return (
        <div className="App">
            <h1>基础案例</h1>
            <Form1/>
            <h1>Markup Schema案例1</h1>
            <Form2/>
            <h1>JSON Schema案例</h1>
            <Form3/>
            <h1>Markup Schema(交互操作,选项1关联选项2)</h1>
            <FormCSZ/>
            <h1>Form4</h1>
            <Form4/>
            {/*<h1>FormCSZFilter</h1>*/}
            {/*<FormCSZFilter/>*/}
            <h1>Form 选择框</h1>
            <FormSelectInput/>
            <h1>Form 表单筛选 JSON Schema 模式</h1>
        </div>
    );
}

export default App;
