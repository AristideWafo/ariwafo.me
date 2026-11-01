import type { CSSProperties, ReactNode } from "react";

// Theme-aware inline SVG diagrams. Colours come from the site's CSS variables.
const C = {
  line: "hsl(var(--border))",
  text: "hsl(var(--foreground))",
  sub: "hsl(var(--muted-foreground))",
  card: "hsl(var(--card))",
  soft: "hsl(var(--surface))",
  hl: "hsl(var(--primary))",
  hlBg: "hsl(var(--accent))",
};
const font: CSSProperties = { fontFamily: "var(--font-mono, ui-monospace, monospace)" };

function Figure({ title, w, h, children }: { title: string; w: number; h: number; children: ReactNode }) {
  return (
    <figure className="not-prose my-8">
      <p className="mb-3 font-semibold">{title}</p>
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label={title} className="h-auto w-full min-w-[560px]" style={font}>
          <defs>
            {[["ar", C.sub], ["arh", C.hl]].map(([id, fill]) => (
              <marker key={id} id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
                <path d="M0 0 10 5 0 10z" fill={fill} />
              </marker>
            ))}
          </defs>
          {children}
        </svg>
      </div>
    </figure>
  );
}

interface BoxProps {
  x: number; y: number; w: number; h: number;
  title: string; sub?: string[]; hl?: boolean; dashed?: boolean; soft?: boolean; left?: boolean;
}
function Box({ x, y, w, h, title, sub = [], hl, dashed, soft, left }: BoxProps) {
  const tx = left ? x + 16 : x + w / 2;
  const anchor = left ? "start" : "middle";
  const n = sub.length + 1;
  // Centre the text block vertically: 18px line pitch, +4 converts line centre to baseline.
  const top = y + h / 2 - ((n - 1) * 9) + 4;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={hl ? C.hlBg : soft ? C.soft : C.card}
        stroke={hl ? C.hl : C.line} strokeWidth={hl ? 2 : 1.5} strokeDasharray={dashed ? "5 4" : undefined} />
      <text x={tx} y={top} textAnchor={anchor} fontSize="13" fontWeight="600" fill={dashed ? C.sub : C.text}>{title}</text>
      {sub.map((s, i) => (
        <text key={i} x={tx} y={top + 18 * (i + 1)} textAnchor={anchor} fontSize="11" fill={C.sub}>{s}</text>
      ))}
    </g>
  );
}

function Line({ d, hl, dashed, label, lx, ly, anchor = "start" }: { d: string; hl?: boolean; dashed?: boolean; label?: string; lx?: number; ly?: number; anchor?: "start" | "middle" | "end" }) {
  const color = hl ? C.hl : C.sub;
  return (
    <g>
      <path d={d} fill="none" stroke={color} strokeWidth={hl ? 2 : 1.25} strokeDasharray={dashed ? "5 4" : undefined} markerEnd={hl ? "url(#arh)" : "url(#ar)"} />
      {label && <text x={lx} y={ly} textAnchor={anchor} fontSize="11" fill={C.sub}>{label}</text>}
    </g>
  );
}

const Panel = ({ x, y, w, h, title, foot }: { x: number; y: number; w: number; h: number; title: string; foot: string }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} fill="none" stroke={C.line} strokeWidth="1.5" />
    <text x={x + w / 2} y={y + 32} textAnchor="middle" fontSize="13" fontWeight="600" fill={C.text}>{title}</text>
    <text x={x + w / 2} y={y + h - 18} textAnchor="middle" fontSize="11" fill={C.text}>{foot}</text>
  </g>
);

export function AccessModels() {
  return (
    <Figure title="The arrow flips: the instance calls out instead of listening" w={900} h={420}>
      <Panel x={10} y={10} w={420} h={400} title="Classic: reach the port, hold the key" foot="Control point: network reach + key file" />
      <Box x={90} y={60} w={260} h={64} title="Engineer" sub={["holds a key pair"]} />
      <Line d="M220 124V170" label="SSH + key" lx={232} ly={152} />
      <Box x={90} y={170} w={260} h={64} title="Bastion host" sub={["port 22 open to a CIDR"]} />
      <Line d="M220 234V280" label="SSH + key" lx={232} ly={262} />
      <Box x={90} y={280} w={260} h={64} title="Instance" sub={["port 22 open to the bastion"]} />

      <Panel x={470} y={10} w={420} h={400} title="Session Manager: the instance calls out" foot="Control point: IAM policy, tags, logs" />
      <Box x={550} y={60} w={260} h={64} title="Engineer" sub={["holds an IAM identity"]} />
      <Line d="M680 124V170" label="StartSession, IAM" lx={692} ly={152} />
      <Box x={550} y={170} w={260} h={64} title="Session Manager (AWS)" sub={["evaluates IAM policy"]} hl />
      <Line d="M680 280V236" hl label="outbound HTTPS 443" lx={692} ly={262} />
      <Box x={550} y={280} w={260} h={64} title="Instance" sub={["no inbound port at all"]} />
    </Figure>
  );
}

export function SessionSequence() {
  const cols = [
    { x: 150, t: "Client", s: "AWS CLI + plugin" },
    { x: 450, t: "Session Manager service", s: "authorizes and relays" },
    { x: 750, t: "SSM Agent", s: "outbound only" },
  ];
  return (
    <Figure title="Both ends dial out and AWS joins the two connections" w={900} h={560}>
      {cols.map((c) => (
        <g key={c.t}>
          <Box x={c.x - 110} y={10} w={220} h={64} title={c.t} sub={[c.s]} />
          <line x1={c.x} y1={74} x2={c.x} y2={500} stroke={C.line} strokeDasharray="4 4" />
        </g>
      ))}
      <Line d="M150 120H446" label="1. StartSession with IAM credentials" lx={298} ly={110} anchor="middle" />
      <Box x={280} y={146} w={340} h={40} title="2. Authorize: IAM policy, managed node" soft />
      <Line d="M450 230H154" dashed label="3. SessionId, StreamUrl, token" lx={298} ly={220} anchor="middle" />
      <Line d="M150 290H446" hl label="4. WebSocket to StreamUrl with token" lx={298} ly={280} anchor="middle" />
      <Line d="M450 340H746" label="5. Signal on control channel" lx={598} ly={330} anchor="middle" />
      <Line d="M750 390H454" hl label="6. Agent opens data channel" lx={602} ly={380} anchor="middle" />
      <Box x={150} y={430} w={600} h={44} title="7. Stdin and stdout relayed by AWS, shell runs as ssm-user" hl />
      <line x1={150} y1={526} x2={190} y2={526} stroke={C.hl} strokeWidth="2" />
      <text x={202} y={530} fontSize="11" fill={C.sub}>Highlighted: the two outbound data connections AWS joins</text>
    </Figure>
  );
}

export function ControlEvidence() {
  const rows = [
    ["1. Human IAM policy", ["Which instances (tags), which session document,", "and whether SendCommand is also allowed"], "CloudTrail", ["Who started a session, when, from which IP,", "on which instance. Not what was typed."]],
    ["2. Session preferences", ["Run As user, idle timeout, maximum duration,", "KMS key, log destinations (S3, CloudWatch)"], "Session transcript", ["Commands and output of interactive shells,", "not of port-forwarding or SSH sessions"]],
    ["3. The host", ["sudo rights of ssm-user, local OS account,", "and any local audit or login policy"], "Host-level audit", ["auditd and OS logs, only if you set them up", "the route to command-level evidence"]],
  ] as const;
  return (
    <Figure title="Each layer of control leaves a different kind of evidence" w={900} h={380}>
      <text x={26} y={20} fontSize="12" fontWeight="600" fill={C.sub}>Control</text>
      <text x={512} y={20} fontSize="12" fontWeight="600" fill={C.sub}>Evidence it leaves</text>
      {rows.map(([t, s, et, es], i) => {
        const y = 36 + i * 112;
        return (
          <g key={t}>
            <Box x={10} y={y} w={440} h={96} title={t} sub={[...s]} left />
            <Line d={`M452 ${y + 48}H494`} />
            <Box x={496} y={y} w={394} h={96} title={et} sub={[...es]} left soft />
          </g>
        );
      })}
    </Figure>
  );
}

export function PrivateNetwork() {
  return (
    <Figure title="No internet route needed: the agent reaches AWS through endpoints" w={900} h={400}>
      <rect x={10} y={10} width={550} height={380} fill="none" stroke={C.line} strokeWidth="1.5" />
      <text x={30} y={38} fontSize="13" fontWeight="600" fill={C.text}>VPC with no NAT and no internet gateway</text>
      <rect x={30} y={56} width={230} height={240} fill="none" stroke={C.line} />
      <text x={46} y={84} fontSize="13" fontWeight="600" fill={C.text}>Private subnet</text>
      <Box x={46} y={100} w={198} h={130} title="EC2 instance" sub={["SSM Agent, outbound only", "no public IP", "no inbound rule", "instance role attached"]} left />
      <rect x={290} y={56} width={240} height={240} fill="none" stroke={C.line} />
      <text x={306} y={84} fontSize="13" fontWeight="600" fill={C.text}>Interface endpoints</text>
      <Box x={306} y={100} w={208} h={40} title="ssm" />
      <Box x={306} y={152} w={208} h={40} title="ssmmessages" />
      <Box x={306} y={204} w={208} h={40} title="ec2messages (legacy)" dashed />
      <Line d="M244 172H302" hl label="443" lx={273} ly={160} anchor="middle" />
      <text x={30} y={332} fontSize="11" fill={C.sub}>Instance SG: no inbound, egress 443 only</text>
      <text x={30} y={352} fontSize="11" fill={C.sub}>Endpoint SG: inbound 443 from the instance SG</text>

      <Line d="M514 172H690" hl label="PrivateLink" lx={602} ly={160} anchor="middle" />
      <Box x={692} y={126} w={200} h={88} title="Systems Manager" sub={["authorizes with IAM", "relays the session"]} left />
      <Line d="M792 292V216" label="public API + IAM" lx={780} ly={258} anchor="end" />
      <Box x={692} y={292} w={200} h={68} title="Engineer" sub={["AWS CLI + IAM"]} left />
    </Figure>
  );
}

export function DnsFailoverFlow() {
  return (
    <Figure title="How the daemon decides: check, fail over, restore" w={900} h={560}>
      <text x={450} y={20} textAnchor="middle" fontSize="11" fill={C.sub}>For each configured record</text>
      <Box x={330} y={30} w={240} h={56} title="Check primary" sub={["every 30s"]} />
      <Line d="M400 86V108H180V128" label="OK" lx={290} ly={102} anchor="middle" />
      <Line d="M500 86V108H700V128" label="KO × 3 consecutive" lx={600} ly={102} anchor="middle" />
      <Box x={60} y={130} w={240} h={60} title="State NORMAL" sub={["counter reset"]} soft />
      <Line d="M60 160H30V58H328" dashed />
      <Box x={580} y={130} w={240} h={60} title="Check secondary" sub={["after 3 consecutive KO"]} />

      <Line d="M670 190V220H560V248" label="secondary OK" lx={615} ly={214} anchor="middle" />
      <Line d="M730 190V220H825V248" label="secondary KO" lx={778} ly={214} anchor="middle" />
      <Box x={450} y={250} w={220} h={60} title="Switch DNS to secondary" sub={["+ Discord"]} hl />
      <Box x={760} y={250} w={130} h={60} title="Discord alert" sub={["nowhere to go"]} />

      <Line d="M560 310V368" />
      <Box x={450} y={370} w={220} h={60} title="FAILOVER mode" sub={["keep checking the primary"]} soft />
      <Line d="M560 430V478" label="OK for 5 stable minutes" lx={548} ly={458} anchor="end" />
      <Box x={450} y={480} w={220} h={60} title="Restore DNS to primary" sub={["+ Discord"]} hl />
      <Line d="M450 510H180V192" dashed label="back to NORMAL" lx={192} ly={340} />

      <Box x={690} y={370} w={200} h={60} title="Check secondary" sub={["in parallel"]} soft />
      <Line d="M790 430V478" label="KO × 5 consecutive" lx={782} ly={458} anchor="end" />
      <Box x={690} y={480} w={200} h={60} title="Discord alert" sub={["degraded fallback"]} />
    </Figure>
  );
}
