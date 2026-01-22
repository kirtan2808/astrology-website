import ExpressionDescription from "../Components/Expression/expression_description";
import "../style/Expression/expression_description.css";
import ExpressionCalc from "../Components/Expression/expression_calc";
import "../style/Expression/expression_calc.css";
import ExpressionExplain from "../Components/Expression/expression_explain";
import "../style/Expression/expression_explain.css";

const Expression = () => {
     return (
          <>
               <ExpressionDescription />
               <ExpressionCalc />
               <ExpressionExplain />
          </>
     );
};

export default Expression;
