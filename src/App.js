import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Root } from "./pages/Root/Root";
import { Home } from "./pages/Home/Home";
import { NovoCliente } from "./pages/NovoCliente/NovoCliente";
import { Clientes } from "./pages/Clientes/Clientes";
import { EditaCliente } from "./pages/EditaCliente/EditaCliente";
import { Pets } from "./pages/Pets/Pets";
import { AdicionarPet } from "./pages/AdicionarPet/AdicionarPet";
import { EditaPet } from "./pages/EditaPet/EditaPet";
import { AdicionarProduto } from "./pages/AdicionarProduto/AdicionarProduto";
import { AdicionarServico } from "./pages/AdicionarServico/AdicionarServico";
import { Produtos } from "./pages/Produtos/Produtos";
import { EditaProduto } from "./pages/EditaProduto/EditaProduto";
import { Servicos } from "./pages/Servicos/Servicos";
import { InformacoesCliente } from "./pages/InformacoesCliente/InformacoesCliente";
import { EditaServico } from "./pages/EditarServico/EditaServico";
import { Pedidos } from "./pages/Pedidos/Pedidos";
import { NovoPedido } from "./pages/NovoPedido/NovoPedido";
import { AtualizarPedido } from "./pages/AtualizarPedido/AtualizarPedido";
import { Agendamentos } from "./pages/Agendamentos/Agendamentos";




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route path="/" element={<Home />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/clientes/novo" element={<NovoCliente />} />
          <Route path="/clientes/editar/:id" element={<EditaCliente />} />
          <Route path="/clientes/informacoes/:id" element={<InformacoesCliente />} />
          <Route path="/pets" element={<Pets />} />
          <Route path="/pets/novo" element={<AdicionarPet />} />
          <Route path="/pets/editar/:id" element={<EditaPet />} />
          <Route path="/produtos/novo" element={<AdicionarProduto />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/produtos/editar/:id" element={<EditaProduto />} />
          <Route path="/servicos/novo" element={<AdicionarServico />} />
          <Route path="/servicos/editar/:id" element={<EditaServico/>}/>
          <Route path="/servicos" element={<Servicos/>}/>
          <Route path="/agendamentos" element={<Agendamentos/>}/>
          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="/pedidos/novo" element={<NovoPedido />} />
          <Route path="/pedidos/editar/:id" element={<AtualizarPedido />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
